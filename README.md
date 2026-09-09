# Local Discover Hub

Merchant Discovery Super-App
Phase 1 — MVP Architecture & Implementation Plan
Project Start: 7 September 2026  |  Target Release: 30 September 2026
Working Days: 17  |  Team: 2 Backend • 1 Web • 1 Mobile • 2 DevOps Interns





Objective
A location-first local-commerce platform similar to District, but supporting many merchant categories: restaurants, cafes, salons, gyms, hotels, retail, electronics, grocery, services and events.
Customer journey: open app → share location → discover nearby businesses → filter/search → view store details and offers → redeem/pay → receive rewards and confirmation.


Architecture Decision
For the current team and 17-working-day deadline, Phase 1 uses two backend applications with clear internal modules instead of eight independently deployed microservices.
Backend 1 — Core Platform: Authentication, User, Merchant, Store, Category, Location, Discovery, Offers.
Backend 2 — Transaction Platform: Payment, Redemption, Rewards, Transaction History, Notifications.
Backend communication is REST. Kafka and Kubernetes are intentionally excluded from Phase 1.
Mobile/Web ──REST──> Backend Core
Mobile/Web ──REST──> Backend Transaction
Backend Core ─REST──> Backend Transaction
Backend ──SQL──> PostgreSQL + PostGIS
Backend ───────> Redis


High-Level Architecture
Customer
|
React Native App
|
HTTPS
|
Nginx / SSL
|
+----------------------+----------------------+
|                                             |
v                                             v
BACKEND CORE                              BACKEND TX
Auth                                      Payment
Merchant                                  Redemption
Store                                     Rewards
Category                                  Transactions
Discovery                                 Notification
Offers
|                                             |
+----------------------+----------------------+
|
PostgreSQL + PostGIS
|
Redis
|
Payment Provider


Frontend Architecture
4.1 Mobile Application
Technology: React Native + TypeScript.
Authentication
Location
Home
Discovery
Categories
Search
Merchant/Store Details
Offers
Payment
Rewards
Transaction History
The mobile application obtains the customer's device location. The backend does not directly access the phone GPS.
4.2 Web Application
Technology: React + TypeScript.
Merchant Portal:
Login, Dashboard, Merchant Profile, Store Management,
Store Location, Offer Management, Transactions





Admin Portal:
Login, Dashboard, Merchant Approval, Store Approval,
Offer Approval, Category Management, Transaction Monitoring
5. Backend Architecture
Both backends use Java 21, Spring Boot 3, Spring Security, JWT, Spring Data JPA, PostgreSQL and Redis.
module/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
└── mapper/
Modules are kept independent internally so they can later be extracted into microservices.
6. Merchant ≠ Store
Merchant = business/brand. Store = physical branch. Location belongs to the Store.
ABC Fitness
├── Pune Store
├── Mumbai Store
├── Nagpur Store
└── Delhi Store
Discovery searches Stores because each branch can have a different geographic location.
7. Core Database Model
users: id, phone, email, role, status, created_at
merchants: id, owner_user_id, business_name, category_id, kyc_status, status
stores: id, merchant_id, store_name, address, city_id, state, pincode,
latitude, longitude, location, status
categories: id, name, parent_id, status
offers: id, merchant_id, store_id, type, value, valid_from, valid_to, status
offer_redemptions: id, offer_id, customer_id, bill_amount,
discount_amount, payable_amount, payment_id
cities: id, name, state, country, center_latitude, center_longitude
8. Location Architecture
The React Native app requests location permission. The device returns latitude/longitude, which the app sends to the Discovery API.
Latitude  = 21.1458
Longitude = 79.0882




GET /api/v1/discovery/nearby?lat=21.1458&lng=79.0882&radius=5000
For normal discovery, refresh location on Home open, meaningful movement, pull-to-refresh, foreground return or map-area change. Do not continuously stream GPS.
9. City vs GPS
City is useful for display, administration and coarse filtering, but it should not drive nearby discovery. Actual discovery uses latitude + longitude + radius. Reverse geocoding is optional supporting functionality.
10. Discovery Module
Discovery is a first-class capability and is not buried inside Offers. Customers must be able to discover stores even when they have no active offer.
GET /api/v1/discovery/nearby
GET /api/v1/discovery/categories
GET /api/v1/discovery/search
GET /api/v1/discovery/stores/{id}
GET /api/v1/discovery/stores/{id}/offers
11. Nearby Discovery Flow
Customer opens Home
↓
Request location permission
↓
Device returns coordinates
↓
Call Discovery API
↓
Validate coordinates/radius
↓
Check Redis
↓
Cache hit? ──YES──> Return cached result
│
NO
↓
PostGIS nearby search
↓
Apply filters
↓
Calculate distance
↓
Rank results
↓
Cache short-lived result
↓
Return paginated results
12. PostGIS
PostGIS allows PostgreSQL to perform geographic radius searches efficiently. Do not fetch all stores into Java and calculate distance there.
SELECT id, merchant_id, store_name, city_id, latitude, longitude
FROM stores
WHERE status = 'ACTIVE'
AND ST_DWithin(
location,
ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
:radiusMeters
);
Important: ST_MakePoint takes longitude first and latitude second.
13. Discovery Filters & Ranking
•	Category and sub-category
•	Distance
•	Open/Closed
•	Active/Inactive
•	Has Offer
•	Rating
•	Price Range
•	Keyword
Initial ranking: distance, active status, offer availability, rating and quality/popularity signals. Personalization can be added later.
14. Redis
Redis is used for fast temporary/hot data. Nearby results should use short TTLs because merchant availability and offers change.
nearby:{geohash}:{radius}:{category}:{filters}
•	Nearby discovery cache
•	OTP
•	Rate limiting
•	Category cache
•	Frequently accessed hot data
15. Merchant Onboarding
Merchant Registration
↓
Business Details
↓
Category
↓
Store Details
↓
Address / Map Pin
↓
KYC
↓
Admin Review
↓
Approval
↓
Store becomes discoverable
Address can be geocoded into coordinates. The merchant can adjust the map pin before saving.
16. Offers
POST /api/v1/offers
GET  /api/v1/stores/{id}/offers
GET  /api/v1/offers/{id}
PUT  /api/v1/offers/{id}




CREATED → PENDING_APPROVAL → ACTIVE → EXPIRED
17. Payment Architecture
Customer
↓
Select Offer
↓
Payment API
↓
Create Payment Intent
↓
UPI Provider
↓
Customer Pays
↓
Payment Webhook
↓
Verify Webhook
↓
Update Transaction
↓
Redeem Offer
↓
Credit Reward
↓
Notification
Payment states: INITIATED, PENDING, SUCCESS, FAILED, REFUNDED. Verify the payment webhook before marking a transaction successful.
18. Backend 1 ↔ Backend 2
Backend Core owns Merchant, Store, Discovery and Offers. Backend Transaction owns Payment, Redemption, Rewards and Transactions. REST is used between them for Phase 1.
19. Why NOT Kafka in Phase 1?
Kafka is useful for asynchronous cross-service events, but with only two backend applications it adds broker, topic, producer, consumer, retry, serialization and monitoring overhead.
Phase 1 → REST
Future   → Kafka when genuinely required
Future examples include payment.success, merchant.approved, store.location.updated and offer.created.
20. Authentication & Security
Use Spring Security + JWT with roles CUSTOMER, MERCHANT and ADMIN.
Login/OTP → Authentication → JWT → Mobile/Web
Authorization: Bearer <JWT>
Customers can discover stores, merchants manage their own stores/offers, and admins approve/manage platform data.
21. Deployment Architecture
Linux VPS
├── Nginx
├── Backend Core Container
├── Backend Transaction Container
├── PostgreSQL Container
├── Redis Container
└── Frontend/Web Container
Use Docker, Docker Compose, Nginx, HTTPS, PostgreSQL/PostGIS and Redis.
22. CI/CD
Developer
↓
Git Push
↓
CI/CD
↓
Build + Unit Tests
↓
Docker Image
↓
Deploy to VPS
↓
Health Check
Each backend should expose a health endpoint such as /actuator/health.
23. Observability
•	Application and Docker logs
•	Health checks
•	CPU/RAM/disk monitoring
•	Database monitoring
•	Payment failure monitoring
Advanced Prometheus/Grafana, Sentry and detailed alerting can be introduced incrementally.
24. Error Handling
200 Success
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
Use @RestControllerAdvice for global exception handling and consistent API error responses.
25. API Design Rule
The frontend should not depend on internal deployment boundaries. GET /api/v1/discovery/nearby remains the same whether Discovery is a module, a microservice or a separate server. This lets the backend evolve without breaking clients.
26. 17-Day Implementation Plan
Phase 1 — Foundation | 7–9 September
•	Backend: Spring Boot, database, Redis, authentication, User, Merchant, Store
•	Mobile: React Native, navigation, login, location permission
•	Web: React, login, Admin/Merchant layouts
•	DevOps: VPS, Docker, Compose, Nginx, PostgreSQL, Redis, CI/CD
Phase 2 — Discovery | 10–15 September
•	Backend: Merchant, Store, Category, Location, Discovery APIs, PostGIS, Redis
•	Mobile: GPS, Home, nearby stores, categories, search, map, store details
•	Web: Merchant onboarding, store creation, map pin, admin approval
Milestone: Customer opens the app and sees real nearby merchants.
Phase 3 — Offers & Transactions | 16–23 September
•	Backend: Offers, Payment, Redemption, Rewards, Transaction History
•	Mobile: Offer details, Redeem, Payment, Success, History
•	Web: Offer management and transaction dashboard
•	DevOps: Deployment, logs, backups, environment configuration
Phase 4 — Integration & Release | 24–30 September
•	Integration/E2E testing
•	Bug fixing
•	Security testing
•	Performance testing
•	UAT
•	Production deployment
•	Final stabilization
No major new features should be added during the final phase.
27. Team Ownership
Role	Responsibilities
Backend Developer 1	Auth, Merchant, Store, Category, Location, Discovery, Offers, PostGIS, Redis
Backend Developer 2	Payment, Redemption, Rewards, Transactions, Notifications
Mobile Developer	Customer app, GPS, Discovery, Merchant Details, Offers, Payment, History
Web Developer	Merchant Portal, Admin Portal, Store Management, Offer Management, Transactions
DevOps Intern 1	VPS, Docker, Compose, Nginx, SSL, Database, Redis, Backups
DevOps Intern 2	CI/CD, Docker builds, Deployment, Logs, Health Checks, Monitoring
28. MVP Scope
Customer
•	Login
•	Location permission
•	Nearby stores
•	Categories
•	Search
•	Store details
•	Offers
•	Payment
•	Redemption
•	Rewards
•	Transaction history
Merchant
•	Registration
•	Business profile
•	Store creation
•	Store location
•	Map pin
•	Offer creation
•	Transaction viewing
Admin
•	Merchant approval
•	Store approval
•	Offer approval
•	Category management
•	Transaction monitoring
Infrastructure
•	Docker
•	VPS
•	Nginx
•	HTTPS
•	PostgreSQL/PostGIS
•	Redis
•	CI/CD
•	Backups
•	Logs
29. Explicitly Out of Scope for September MVP
•	Kafka
•	Kubernetes
•	8 independent microservices
•	AI recommendation engine
•	Advanced analytics
•	Elasticsearch
•	Cab/Fleet tracking
•	BBPS
•	Recharge
•	Bus booking
•	Movie booking
•	Complex loyalty engine
•	Advanced event-driven architecture
30. Future Evolution
API Gateway
|
┌─────────────┼─────────────┐
↓             ↓             ↓
Auth         Merchant      Discovery
Service       Service       Service
|
Offer Service
|
Payment Service
|
Kafka
/    |    

Rewards Notification Analytics
Phase 1 modules have clear boundaries. As the product and team grow, these modules can be extracted into independent services and Kafka can be introduced where asynchronous processing is genuinely required.
31. Key Risks & Mitigation
Risk	Mitigation
Location permission denied	Manual city/search/map selection
Incorrect merchant coordinates	Merchant/admin map correction
Too many geo queries	PostGIS spatial index + Redis + pagination
Merchant has many branches	Store-level location model
Offers change frequently	Short cache TTL
VPS resources limited	Monitor CPU/RAM/disk and scale later
Too much microservice complexity	Modular architecture instead of unnecessary services
32. Final Architecture Decision
Backend       → Java 21 + Spring Boot 3
Mobile        → React Native + TypeScript
Web           → React + TypeScript
Database      → PostgreSQL + PostGIS
Cache         → Redis
Security      → Spring Security + JWT
Communication → REST
Deployment    → Docker Compose + Linux VPS
Reverse Proxy → Nginx
Payment       → UPI Provider + Webhooks
Kafka         → Not in Phase 1
Kubernetes    → Not in Phase 1
Main principle: Build the simplest architecture that can deliver the product by 30 September, while keeping module boundaries clean enough to evolve into microservices later.




TECHNICAL SPECIFICATION DOCUMENT
Discount & Rewards Super-App
For Engineering / Development Team
Backend: Java 21 + Spring Boot 3   |   App: React Native   |   Deployment: Client's Linux VPS
Version 1.0  •  September 2026
 
Table of Contents








Document Purpose & Scope	3








High-Level System Architecture	3








Microservices Breakdown	4








Database Design (Per Service)	5








API Specification (Key Endpoints)	7








Authentication & Security Implementation	9








Payment (UPI) Integration Flow	10








Third-Party Integrations	11








Mobile App Structure (React Native)	12








Backend Structure (Java / Spring Boot)	13








Deployment on Client VPS	14








Git Workflow & Coding Standards	16








Testing Strategy	16








Monitoring, Logging & Alerting	17








Environment Configuration	17








Appendix — Error Codes & Sample Configs	18
 








Document Purpose & Scope
This document is the technical reference for the engineering team building the Discount & Rewards Super-App. It covers system architecture, service boundaries, database design, API contracts, security implementation, third-party integration specifics, mobile/backend code structure, deployment on the client's existing Linux VPS, and engineering process (branching, testing, monitoring).
Companion document: see the client-facing "Project Report" for business scope, timeline (3 months / 12 weeks), pricing (₹4,00,000 + 18% GST), AMC (₹60,000 + 18% GST/year), and the 5-month bug-fix-only post-launch support terms. This document assumes that scope as fixed and focuses purely on how it will be built.








High-Level System Architecture








The system follows a microservices architecture on the backend (Java/Spring Boot), fronted by a single API Gateway, with three React Native apps (Customer, Merchant, Driver-Partner) and a React.js Admin web dashboard as clients. All services are containerized with Docker and deployed on the client's existing Linux VPS via Docker Compose — no Kubernetes cluster is required at this scale.
 
3. Microservices Breakdown
Service	Responsibility	Primary DB	Key Dependencies
auth-service	Signup/login, OTP verification, JWT issue & refresh, RBAC roles	PostgreSQL, Redis	SMS/OTP gateway
offer-service	Merchant offer CRUD, offer discovery/search, QR generation & validation	PostgreSQL, MongoDB	merchant-service
payment-service	UPI intent generation, webhook verification, settlement ledger, reconciliation	PostgreSQL	UPI PSP/webhook, Kafka
rewards-service	Points earn/redeem rules, balance ledger, expiry jobs	PostgreSQL, Redis	payment-service (events)
merchant-service	Merchant onboarding, KYC status, store profile, analytics aggregation	PostgreSQL	auth-service
recharge-service	Operator/plan lookup, recharge order placement & status	PostgreSQL	Recharge Aggregator API
billpay-service	Discom lookup, bill fetch, bill payment via BBPS	PostgreSQL	BBPS OU API
bus-service	Route/seat search, booking, e-ticket generation	PostgreSQL, MongoDB	Bus Aggregator API
cab-service	Ride request, driver matching, live location, fare calc	PostgreSQL, Redis	Maps API, driver-partner app (WebSocket)
notification-service	Push (FCM), SMS, WhatsApp, in-app notification templates	MongoDB	FCM, SMS gateway
analytics-service	Event ingestion, merchant/admin dashboards, reporting	MongoDB	Kafka (event consumer)




All services are stateless where possible and communicate synchronously via REST (through the gateway) and asynchronously via Kafka topics for cross-service events (e.g. payment.success → rewards-service, booking.confirmed → notification-service).
 
4. Database Design (Per Service)
Core tables per service — simplified to primary keys and key fields. Full DDL to be maintained in each service's /db/migrations folder (Flyway).
4.1 auth-service (PostgreSQL)
Table	Key Columns
users	id (PK), phone, email, password_hash, role (CUSTOMER/MERCHANT/DRIVER/ADMIN), status, created_at
otp_requests	id (PK), user_id (FK), otp_hash, purpose, expires_at, verified_at
refresh_tokens	id (PK), user_id (FK), token_hash, device_id, expires_at, revoked_at
4.2 offer-service
Table	Key Columns
merchants	id (PK), user_id (FK), business_name, category, kyc_status, bank_upi_id
offers	id (PK), merchant_id (FK), type (FLAT_PCT/FLAT_AMT/BOGO), value, max_discount, valid_from, valid_to, status
offer_redemptions	id (PK), offer_id (FK), customer_id (FK), bill_amount, discount_amount, payable_amount, payment_id (FK), created_at
4.3 payment-service
Table	Key Columns
payment_intents	id (PK), reference_type (OFFER/RECHARGE/BILL/BUS/CAB), reference_id, amount, upi_intent_url, status
payment_webhooks	id (PK), intent_id (FK), raw_payload, signature_valid (bool), processed_at
settlements	id (PK), merchant_id (FK), payment_intent_id (FK), settled_amount, settled_at
4.4 rewards-service
Table	Key Columns
reward_ledger	id (PK), customer_id (FK), points, type (EARN/REDEEM/EXPIRE), source_ref, created_at
reward_balances	customer_id (PK), total_points, updated_at (materialized balance for fast reads)
4.5 recharge-service / billpay-service
Table	Key Columns
recharge_orders	id (PK), customer_id (FK), operator, mobile_number, plan_amount, aggregator_ref, status
bill_payments	id (PK), customer_id (FK), discom_code, consumer_number, bill_amount, bbps_ref, status
4.6 bus-service / cab-service
Table	Key Columns
bus_bookings	id (PK), customer_id (FK), route_id, seat_no, aggregator_booking_ref, ticket_qr, status
cab_rides	id (PK), customer_id (FK), driver_id (FK), pickup_geo, drop_geo, fare, status, started_at, ended_at
driver_locations	driver_id (PK), lat, lng, updated_at (Redis-backed for live tracking, persisted periodically)
 
5. API Specification (Key Endpoints)
All endpoints are versioned under /api/v1 and routed through the API Gateway. Auth endpoints are public; all others require a valid Bearer JWT unless marked otherwise.
5.1 Auth Service
Method	Endpoint	Description
POST	/api/v1/auth/otp/request	Request OTP for phone number (rate-limited: 3/hour/number)
POST	/api/v1/auth/otp/verify	Verify OTP, returns access_token + refresh_token
POST	/api/v1/auth/token/refresh	Exchange a valid refresh_token for a new access_token
POST	/api/v1/auth/logout	Revoke refresh_token for current device
5.2 Offer Service
Method	Endpoint	Description
GET	/api/v1/offers/nearby?lat&lng	List merchant offers near the customer
POST	/api/v1/offers	[Merchant] Create a new offer
GET	/api/v1/merchants/{id}/qr	Fetch the merchant's static QR payload
POST	/api/v1/offers/redeem	Apply best offer to a scanned bill; returns payable amount + payment_intent_id
5.3 Payment Service
Method	Endpoint	Description
POST	/api/v1/payments/intent	Create a UPI payment intent for any reference type (offer/recharge/bill/bus/cab)
POST	/api/v1/payments/webhook	[Public, HMAC-signed] PSP webhook — payment success/failure callback
GET	/api/v1/payments/{id}/status	Poll payment status (used as fallback if webhook is delayed)
Sample: Create Payment Intent
POST /api/v1/payments/intent
Authorization: Bearer <jwt>
Content-Type: application/json




{
"referenceType": "OFFER",
"referenceId": "off_redeem_98213",
"amount": 850.00,
"payeeVpa": "merchant123@upi"
}




Response 200:
{
"intentId": "pay_int_55210",
"upiIntentUrl": "upi://pay?pa=merchant123@upi&am=850.00&tn=OfferRedeem&tr=pay_int_55210",
"status": "PENDING"
}
Sample: Payment Webhook Payload (from PSP)
POST /api/v1/payments/webhook
X-Signature: <hmac-sha256>




{
"intentId": "pay_int_55210",
"status": "SUCCESS",
"utr": "UPI2026090312345678",
"amount": 850.00,
"timestamp": "2026-09-03T10:15:22Z"
}
5.4 Utility Services
Method	Endpoint	Description
GET	/api/v1/recharge/operators?number=	Detect operator/circle for a mobile number
POST	/api/v1/recharge/orders	Place a recharge order (returns payment_intent_id)
GET	/api/v1/billpay/fetch?discom&consumerNo	Fetch live electricity bill amount via BBPS
POST	/api/v1/billpay/pay	Pay a fetched electricity bill
GET	/api/v1/bus/search?from&to&date	Search available bus routes/seats
POST	/api/v1/bus/bookings	Book a bus seat
POST	/api/v1/cab/rides	Request a cab ride (pickup/drop geo)
GET	/api/v1/cab/rides/{id}/track	Live location polling / WebSocket channel for an active ride
 
6. Authentication & Security Implementation
6.1 Auth Flow (OTP + JWT)
•	Customer/Merchant/Driver enters phone number → auth-service generates a 6-digit OTP, hashed (bcrypt) and stored with a 5-minute expiry, sent via SMS gateway.
•	On correct OTP, auth-service issues a short-lived access_token (JWT, 15 min expiry) and a long-lived refresh_token (30 days, stored hashed, one per device).
•	Every subsequent request carries the access_token as a Bearer header; Spring Security validates signature + expiry at the Gateway before routing to any service.
•	Refresh tokens are rotated on every use (old one revoked) to limit replay risk if a token is leaked.
6.2 Role-Based Access Control (RBAC)
Role	Scope	Example Restriction
CUSTOMER	Own profile, own bookings/payments/rewards	Cannot access another customer's reward ledger or ride history
MERCHANT	Own store, own offers, own transactions	Cannot view another merchant's settlement data
DRIVER	Own ride requests, own location updates	Cannot access customer payment details beyond fare amount
ADMIN	Platform-wide read, limited write (support actions)	All writes are audit-logged (who/when/what changed)
6.3 Data Protection
•	PII (phone, email, bank/UPI VPA) encrypted at rest using AES-256 field-level encryption; encryption keys held in HashiCorp Vault, never in application config.
•	TLS 1.3 enforced end-to-end (app ↔ Gateway ↔ services); HTTP is disabled at the Nginx layer on the VPS.
•	No card or UPI PIN is ever collected or stored by the platform — payment is completed inside the customer's own UPI app; the backend only receives a signed success/failure callback.
•	All webhook payloads (Payment PSP, BBPS, Recharge/Bus aggregators) are HMAC-signature verified before processing; unsigned or mismatched-signature requests are rejected and logged.
•	Audit logging (Hibernate Envers) on all financial and KYC-related tables.
 
7. Payment (UPI) Integration Flow
The platform never pools customer funds — every payment moves directly from the customer's bank to the merchant's/biller's bank via UPI. This keeps the platform outside RBI Payment Aggregator / PPI licensing scope.
7.1 Step-by-Step Flow
•	1. Customer app calls POST /payments/intent with the amount and payee VPA (merchant, or the biller/aggregator's collection VPA for utility payments).
•	2. payment-service creates a payment_intents row (status PENDING) and returns a upi://pay deep-link.
•	3. The React Native app opens the deep-link, which hands off to whichever UPI app is installed (PhonePe/GPay/Paytm/BHIM) for the customer to authorize with their UPI PIN.
•	4. The UPI network settles the transfer bank-to-bank. The PSP/UPI switch sends a signed webhook to POST /payments/webhook.
•	5. payment-service verifies the HMAC signature, updates the intent status to SUCCESS/FAILED, and publishes a payment.success (or .failed) event to Kafka.
•	6. Downstream services consume the event: rewards-service credits points, offer-service marks the redemption complete, notification-service sends a confirmation push/SMS.
•	7. As a safety net (in case a webhook is delayed or dropped), the app polls GET /payments/{id}/status every few seconds for up to ~60 seconds after opening the UPI app.
 
8. Third-Party Integrations
Integration	Technical Notes	Owned By
UPI / PSP	Server-to-server webhook + client-side deep-link (upi://pay). Needs a PSP/bank partner for VPA collection & webhook signing key.	Client to arrange PSP agreement; dev team integrates API
BBPS (Electricity)	Integrate via a BBPS-authorised Operating Unit (OU). Two calls: Bill-Fetch (GetBillDetails) then Bill-Pay (with COU transaction ref).	Client to complete BBPS OU onboarding/KYC; billed at actuals
Recharge Aggregator	REST API — operator/circle detection, plan catalog, order placement, async status callback.	Aggregator commercial terms by client; billed at actuals
Bus Aggregator	REST API — route/seat search, seat-lock, booking confirmation, ticket/QR retrieval.	Aggregator commercial terms by client; billed at actuals
Maps / Fleet API	Geocoding, distance/ETA calculation, live location (Google Maps SDK or Mapbox) for cab-service.	API key billed at actuals (usage-based)
SMS / OTP Gateway	Used by auth-service for OTP and by notification-service for transactional SMS.	Gateway billed at actuals (per-SMS)
FCM (Push Notifications)	Firebase Cloud Messaging for order/ride/offer notifications on Android & iOS.	Free tier typically sufficient
 
9. Mobile App Structure (React Native)
A single React Native codebase with role-based navigation stacks (Customer / Merchant / Driver), sharing common UI components and API client layers.
/app
/src
/api            // axios instances + per-service API modules (auth.ts, offers.ts, payments.ts...)
/components      // shared UI (Button, Card, QRScanner, OTPInput...)
/features
/auth
/customer      // offers, scan-and-pay, rewards, recharge, billpay, bus, cab
/merchant       // onboarding, offer management, dashboard
/driver         // ride requests, live location, earnings
/navigation       // RootNavigator, CustomerStack, MerchantStack, DriverStack
/store            // Redux Toolkit slices + RTK Query API slices
/hooks
/utils            // formatters, deep-link handlers, geolocation helpers
/constants
App.tsx
index.js
9.1 Key Libraries
•	Navigation: @react-navigation/native (stack + bottom-tab navigators per role)
•	State/Data: Redux Toolkit + RTK Query (or React Query) for server-state caching
•	QR Scan: react-native-vision-camera + ML Kit barcode scanning
•	Maps/Location: react-native-maps, @react-native-community/geolocation
•	Push: @react-native-firebase/messaging
•	Deep-linking: React Native Linking API for upi:// intents and app-to-UPI-app handoff
 
10. Backend Structure (Java / Spring Boot)
Each microservice follows a standard layered package structure for consistency across the team:
com.superapp.<service>
├── config          // SecurityConfig, KafkaConfig, SwaggerConfig
├── controller       // REST controllers (thin — validation + delegation only)
├── service          // business logic
├── repository        // Spring Data JPA repositories
├── entity            // JPA entities
├── dto               // request/response DTOs (never expose entities directly)
├── mapper            // entity <-> DTO mapping (MapStruct)
├── event             // Kafka producers/consumers
├── exception         // custom exceptions + @ControllerAdvice handler
└── SuperAppServiceApplication.java
10.1 Conventions
•	Controllers never contain business logic — they validate input (Jakarta Validation) and delegate to a service class.
•	All monetary values use BigDecimal (never float/double) to avoid rounding errors.
•	Every entity has created_at/updated_at (auditing via Spring Data JPA Auditing).
•	Cross-service calls go through the API Gateway or Kafka events — services never call each other's databases directly.
•	API responses follow a consistent envelope: { "success": true, "data": {...} } or { "success": false, "error": { "code": "...", "message": "..." } }.
 
11. Deployment on Client VPS
All services are deployed as Docker containers on the client's existing Linux VPS, orchestrated with Docker Compose (no Kubernetes needed at current scale). Nginx handles reverse-proxying and SSL termination.
11.1 docker-compose.yml (excerpt)
version: "3.9"
services:
api-gateway:
image: superapp/api-gateway:latest
ports: ["8080:8080"]
depends_on: [auth-service, offer-service, payment-service]
restart: unless-stopped




auth-service:
image: superapp/auth-service:latest
env_file: ./env/auth.env
depends_on: [postgres, redis]
restart: unless-stopped




payment-service:
image: superapp/payment-service:latest
env_file: ./env/payment.env
depends_on: [postgres, kafka]
restart: unless-stopped




postgres:
image: postgres:16
volumes: ["pgdata:/var/lib/postgresql/data"]
restart: unless-stopped




redis:
image: redis:7
restart: unless-stopped




kafka:
image: bitnami/kafka:latest
restart: unless-stopped




nginx:
image: nginx:latest
volumes:
- ./nginx/conf.d:/etc/nginx/conf.d
- ./certbot/conf:/etc/letsencrypt
ports: ["80:80", "443:443"]
depends_on: [api-gateway]
restart: unless-stopped




volumes:
pgdata:
11.2 Nginx Reverse Proxy (excerpt)
server {
listen 443 ssl;
server_name api.superapp.in;



ssl_certificate     /etc/letsencrypt/live/api.superapp.in/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.superapp.in/privkey.pem;

location / {
    proxy_pass http://api-gateway:8080;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
}




}
11.3 CI/CD Pipeline (GitHub Actions)
•	On push to main: run unit tests → build Docker image → push to container registry.
•	On successful build: SSH into the client's VPS, docker compose pull && docker compose up -d for the affected service(s) only (zero-downtime rolling restart per service).
•	Database migrations run automatically via Flyway on service startup, guarded by a migration lock.
•	Rollback: previous image tag is kept on the VPS; a rollback re-points docker-compose to the last-known-good tag.
 
12. Git Workflow & Coding Standards
12.1 Branching
•	main — always production-ready, protected, deploys automatically to production.
•	develop — integration branch for the current sprint, deploys to staging.
•	feature/<ticket-id>-short-desc — one branch per task, merged into develop via PR.
•	hotfix/<ticket-id> — branched from main for urgent production fixes.
12.2 Commit & PR Convention
•	Conventional commits: feat:, fix:, chore:, refactor:, test:, docs:.
•	Every PR must link a ticket, pass CI (build + tests + lint), and get at least one code review approval before merge.
•	No direct commits to main or develop — all changes go through a Pull Request.
12.3 Code Style
•	Java: Google Java Format + Checkstyle enforced in CI.
•	React Native/TypeScript: ESLint + Prettier, strict TypeScript mode (no implicit any).
•	All new backend endpoints documented via OpenAPI/Swagger annotations.








Testing Strategy
Layer	Tooling	Coverage Target
Backend Unit Tests	JUnit 5 + Mockito	≥ 70% for service-layer business logic
Backend Integration Tests	Spring Boot Test + Testcontainers (real Postgres/Kafka in CI)	All critical flows: payment webhook, offer redemption, BBPS bill-pay
API Contract Tests	Postman/Newman collections run in CI	Every public endpoint
Mobile Unit Tests	Jest + React Native Testing Library	Core hooks, reducers, utils
E2E Tests	Detox (mobile), Cypress (admin web)	Critical user journeys: scan-and-pay, recharge, bus booking, cab request
Security Testing	OWASP ZAP scan + manual VAPT before go-live	All external-facing endpoints
Load Testing	k6 / JMeter	Payment & offer-redemption endpoints at 3x expected peak load
 








Monitoring, Logging & Alerting
•	Metrics: Prometheus scrapes each service's /actuator/prometheus endpoint; Grafana dashboards for latency, error rate, and throughput per service.
•	Logs: structured JSON logs shipped to Loki (or the ELK stack); correlation IDs propagated across services for end-to-end request tracing.
•	Error Tracking: Sentry captures unhandled exceptions from both the backend services and the React Native apps.
•	Alerting: Grafana Alerting (or Prometheus Alertmanager) notifies the team via Slack/email on: payment-service error rate spike, webhook signature failures, VPS disk/CPU/memory thresholds, and BBPS/aggregator API failures.
•	Uptime monitoring: an external uptime check (e.g. UptimeRobot) pings the production API Gateway every minute.








Environment Configuration
Environment	Purpose	Notes
local	Developer machines	Docker Compose with mock/sandbox third-party API keys
staging	QA / UAT	Same VPS or a separate low-spec VPS; sandbox UPI/BBPS/aggregator credentials
production	Live traffic	Client's Linux VPS; production PSP/BBPS/aggregator credentials; secrets in Vault
All secrets (DB passwords, JWT signing keys, third-party API keys) are injected via environment variables from a secrets manager — never committed to the Git repository. A .env.example file with placeholder keys is maintained per service for onboarding new developers.








Appendix — Error Codes & Sample Configs
16.1 Standard Error Codes
Code	HTTP Status	Meaning
AUTH_001	401	Invalid or expired access token
AUTH_002	429	OTP request rate-limit exceeded
OFFER_001	404	Offer not found or expired
PAY_001	400	Payment intent amount mismatch
PAY_002	409	Webhook signature verification failed
BBPS_001	502	Biller (discom) temporarily unreachable
BUS_001	409	Seat no longer available (lock expired)
CAB_001	404	No driver-partner available nearby
16.2 Sample .env.example (payment-service)
SERVER_PORT=8083
DB_URL=jdbc:postgresql://postgres:5432/payment_db
DB_USER=set_in_vault
DB_PASSWORD=set_in_vault
JWT_PUBLIC_KEY_PATH=/secrets/jwt-public.pem
UPI_PSP_BASE_URL=https://sandbox.psp-provider.example/api
UPI_WEBHOOK_HMAC_SECRET=set_in_vault
KAFKA_BROKER=kafka:9092








this is my the doc so i want the fornend for the web use for now the dummy data after that we will  integrate teh api and before creating first tell how you are going to do that if your are using any ui library first tell that i want it should very good and clean polish and all other asccerpt of the design

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69396e82-357f-4e3f-a74c-6eabc250431a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
