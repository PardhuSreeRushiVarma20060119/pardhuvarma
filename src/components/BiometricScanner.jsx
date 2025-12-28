import React, { useState, useEffect } from 'react';

const BiometricScanner = ({ onScanComplete }) => {
    const [status, setStatus] = useState('idle'); // idle, scanning, success, error
    const [progress, setProgress] = useState(0);
    const [hasWebAuthn, setHasWebAuthn] = useState(false);
    const [useNative, setUseNative] = useState(true);

    useEffect(() => {
        // Check availability
        if (window.PublicKeyCredential) {
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                .then(available => {
                    setHasWebAuthn(available);
                    if (available) triggerNativeAuth(); // Auto-trigger if available
                });
        }
    }, []);

    const triggerNativeAuth = async () => {
        try {
            setStatus('scanning');

            // Challenge (Normally from server)
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            // We use 'create' here to force a User Presence check via Windows Hello/TouchID
            await navigator.credentials.create({
                publicKey: {
                    challenge,
                    rp: { name: "Scientific Journal Admin" },
                    user: {
                        id: new Uint8Array(16),
                        name: "admin",
                        displayName: "Administrator"
                    },
                    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                    authenticatorSelection: {
                        authenticatorAttachment: "platform", // Forces TouchID/Windows Hello
                        userVerification: "required"
                    },
                    timeout: 60000,
                    attestation: "none"
                }
            });

            // If we get here, the OS verified the biometrics successfully
            setStatus('success');
            setTimeout(onScanComplete, 500);

        } catch (err) {
            console.warn("WebAuthn cancelled or failed", err);
            // Fallback to simulation if native fails or user cancels
            setStatus('error');
            setUseNative(false);
        }
    };

    const startSimulation = () => {
        if (status === 'success') return;
        setStatus('scanning');
        setProgress(0);

        // Simulate scan duration
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStatus('success');
                setTimeout(() => {
                    onScanComplete();
                }, 800);
            }
        }, 30);
    };

    // Helper for border color
    const getBorderColor = () => {
        if (status === 'success') return '#00ff41';
        if (status === 'scanning') return '#00ccff';
        if (status === 'error') return '#ff3333';
        return '#444';
    };

    return (
        <div style={{
            border: '1px solid #333', background: '#050505',
            padding: '2rem', borderRadius: '8px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '1.5rem', userSelect: 'none'
        }}>
            <h3 className="mono" style={{ color: '#888', fontSize: '0.9rem', letterSpacing: '2px' }}>
                BIOMETRIC AUTHENTICATION REQUIRED
            </h3>

            {/* Fingerprint / Scanner Area */}
            <div
                onMouseDown={startSimulation}
                onClick={hasWebAuthn && useNative ? triggerNativeAuth : undefined}
                style={{
                    width: '120px', height: '120px',
                    border: `2px solid ${getBorderColor()}`,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s'
                }}
            >
                {/* Fingerprint Icon / graphic */}
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={getBorderColor()} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6" />
                    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                    <path d="M8.63 7.17A2 2 0 0 1 11.1 5.6a2 2 0 0 1 1.27 2.9" />
                    <path d="M14 12a2 2 0 0 1 0 4" />
                    <path d="M12 19a4 4 0 0 1-4-4" />
                    <path d="M21.5 16.5C19.5 19 19.5 20.5 20.5 22" />
                    <path d="M15 22c-1-1.5-1-4-1.5-4.5" />
                    <path d="M12 12a2 2 0 0 0-2-2" />
                </svg>

                {/* Scan Line */}
                {status === 'scanning' && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                        background: '#00ccff',
                        boxShadow: '0 0 10px #00ccff',
                        animation: 'scan 1s linear infinite'
                    }} />
                )}
            </div>

            <div className="mono" style={{ color: getBorderColor(), fontSize: '0.8rem', textAlign: 'center' }}>
                {status === 'idle' && (hasWebAuthn && useNative ? "CONNECTING TO DEVICE SENSOR..." : "CLICK TO SCAN")}
                {status === 'scanning' && (hasWebAuthn && useNative ? "VERIFY ON DEVICE NOW..." : `VERIFYING IDENTITY... ${progress}%`)}
                {status === 'success' && "IDENTITY CONFIRMED"}
                {status === 'error' && "DEVICE AUTH FAILED. CLICK TO SIMULATE."}
            </div>

            <style>{`
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default BiometricScanner;
