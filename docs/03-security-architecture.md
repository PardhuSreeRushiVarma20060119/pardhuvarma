# Security Architecture & Threat Model

## 1. Philosophy: Client-Side Sovereignty
Since this application operates without a backend database, security focuses on **Access Control** to the local administration interface rather than protecting server-side info. The goal is to prevent unauthorized access to the "Second Brain" write-access features on the owner's device.

## 2. Authentication Pipeline

The system employs a **Defense-in-Depth** strategy for high-risk actions (Password Updates, Nuke Data).

### Layer 1: Knowledge Factor (Password)
- **Mechanism**: Simple string comparison against a locally stored hash (simulated as string currently).
- **Role**: Basic gatekeeping to prevent accidental admin access by guests.

### Layer 2: Inherence Factor (Biometrics)
- **Technology**: **WebAuthn (FIDO2)** via `navigator.credentials`.
- **Implementation**:
    - The app challenges the OS to verify the user.
    - Windows Hello / Touch ID / Face ID intercepts the request.
    - Success indicates the user is physically present and is the owner of the device.
- **Fallback**: If hardware is unavailable, the UI degrades to a simulated scanner (for demo purposes), but typically this locks the feature.

### Layer 3: Possession Factor (TOTP)
- **Technology**: **Time-based One-Time Password** (RFC 6238).
- **Library**: `otpauth` (Client-side).
- **Flow**:
    1.  Secret generated (Base32) locally.
    2.  QR Code presented to user.
    3.  User scans with Google/Microsoft Authenticator.
    4.  App verifies the 6-digit code against the current definition of time.

## 3. Data Integrity & Self-Healing

### Corruption Recovery
`DataContext` implements a watchdog on initialization.
- **Scenario**: LocalStorage is wiped or corrupted (e.g., user clears cache partially).
- **Response**: The app detects missing keys (`home`, `about`, `projects`). It immediately re-hydrates them from the immutable `sourceContent.js` file, restoring the site to a working state without user intervention.

### Isolation
- **Admin State**: Stored in `admin_session` (SessionStorage/LocalStorage).
- **Content State**: Stored in `portfolio_db`.
- **Separation**: Clearing content data does not log the admin out. Loging out does not delete content.

## 4. Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| **XSS (Cross-Site Scripting)** | High | React's automatic escaping; No `dangerouslySetInnerHTML` used on user input. |
| **Physical Device Access** | Critical | Biometric + TOTP required for sensitive changes. |
| **Network Sniffing** | Low | No passwords sent over wire (Zero-Backend). |
| **LocalStorage Tampering** | Medium | Data validation on load; "Self-Healing" logic restores critical schemas. |
