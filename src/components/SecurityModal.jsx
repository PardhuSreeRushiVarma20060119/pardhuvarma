import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BiometricScanner from './BiometricScanner';
import QRCode from 'qrcode';

const SecurityModal = ({ onClose }) => {
    const { verifyPassword, generateTOTPSecret, verifyTOTP, updateCredentials, hasTOTP } = useAuth();

    const [step, setStep] = useState('verify-old'); // verify-old, biometric, setup-totp, verify-totp, new-password, success
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [totpCode, setTotpCode] = useState('');
    const [error, setError] = useState('');

    // For Setup
    const [newSecret, setNewSecret] = useState(null);
    const [qrUrl, setQrUrl] = useState('');

    const handleVerifyOld = () => {
        if (verifyPassword(oldPass)) {
            setError('');
            setStep('biometric');
        } else {
            setError('Incorrect Password');
        }
    };

    const handleBiometricSuccess = () => {
        // Check if user has TOTP
        if (hasTOTP()) {
            setStep('verify-totp');
        } else {
            // Start Setup
            const secret = generateTOTPSecret();
            setNewSecret(secret);
            // Generate QR
            const otpUrl = `otpauth://totp/ScientificJournal:Admin?secret=${secret}&issuer=ScientificJournal`;
            QRCode.toDataURL(otpUrl)
                .then(url => setQrUrl(url))
                .catch(err => console.error(err));
            setStep('setup-totp');
        }
    };

    const handleVerifyTotp = () => {
        const valid = verifyTOTP(totpCode);
        if (valid) {
            setStep('new-password');
            setError('');
        } else {
            setError('Invalid Code');
        }
    };

    const handleSetupverify = () => {
        // Verify against NEW secret
        const valid = verifyTOTP(totpCode, newSecret);
        if (valid) {
            setStep('new-password');
            setError('');
        } else {
            setError('Invalid Code. Ensure you added it to your Authenticator app.');
        }
    };

    const handleSave = () => {
        if (newPass.length < 4) {
            setError('Password too weak');
            return;
        }
        // Save
        const success = updateCredentials(newPass, newSecret); // Pass newSecret if we just set it up
        if (success) setStep('success');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)', zIndex: 3000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: '#111', border: '1px solid #333', padding: '2.5rem',
                borderRadius: '12px', width: '450px', maxWidth: '90vw',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="mono" style={{ fontSize: '1.1rem', color: 'white', margin: 0 }}>SECURITY SETTINGS</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>x</button>
                </div>

                {step === 'verify-old' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Enter current password to proceed.</p>
                        <input
                            type="password"
                            value={oldPass} onChange={e => setOldPass(e.target.value)}
                            placeholder="Current Password"
                            style={{
                                background: '#222', border: '1px solid #444', color: 'white',
                                padding: '0.8rem', borderRadius: '4px', outline: 'none'
                            }}
                        />
                        {error && <div style={{ color: '#f00', fontSize: '0.8rem' }}>{error}</div>}
                        <button onClick={handleVerifyOld} style={{ background: 'var(--accent-cyber)', border: 'none', padding: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                            VERIFY
                        </button>
                    </div>
                )}

                {step === 'biometric' && (
                    <BiometricScanner onScanComplete={handleBiometricSuccess} />
                )}

                {step === 'setup-totp' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
                        <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Scan this QR code with Google Authenticator.</p>
                        {qrUrl && <img src={qrUrl} alt="QR Code" style={{ border: '5px solid white', borderRadius: '4px' }} />}
                        <div className="mono" style={{ fontSize: '0.7rem', color: '#666' }}>SECRET: {newSecret}</div>

                        <input
                            type="text"
                            value={totpCode} onChange={e => setTotpCode(e.target.value)}
                            placeholder="Enter 6-digit Code"
                            style={{
                                background: '#222', border: '1px solid #444', color: 'white',
                                padding: '0.8rem', borderRadius: '4px', outline: 'none', width: '100%', textAlign: 'center', letterSpacing: '4px'
                            }}
                        />
                        {error && <div style={{ color: '#f00', fontSize: '0.8rem' }}>{error}</div>}
                        <button onClick={handleSetupverify} style={{ background: 'var(--accent-cyber)', border: 'none', padding: '0.8rem', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
                            CONFIRM & NEXT
                        </button>
                    </div>
                )}

                {step === 'verify-totp' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Enter code from Google Authenticator.</p>
                        <input
                            type="text"
                            value={totpCode} onChange={e => setTotpCode(e.target.value)}
                            placeholder="000 000"
                            style={{
                                background: '#222', border: '1px solid #444', color: 'white',
                                padding: '0.8rem', borderRadius: '4px', outline: 'none', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px'
                            }}
                        />
                        {error && <div style={{ color: '#f00', fontSize: '0.8rem' }}>{error}</div>}
                        <button onClick={handleVerifyTotp} style={{ background: 'var(--accent-cyber)', border: 'none', padding: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                            VERIFY
                        </button>
                    </div>
                )}

                {step === 'new-password' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Authentications passed. Enter new password.</p>
                        <input
                            type="password"
                            value={newPass} onChange={e => setNewPass(e.target.value)}
                            placeholder="New Password"
                            style={{
                                background: '#222', border: '1px solid #444', color: 'white',
                                padding: '0.8rem', borderRadius: '4px', outline: 'none'
                            }}
                        />
                        {error && <div style={{ color: '#f00', fontSize: '0.8rem' }}>{error}</div>}
                        <button onClick={handleSave} style={{ background: 'var(--accent-cyber)', border: 'none', padding: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                            UPDATE PASSWORD
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ color: '#00ff41', fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                        <h3 style={{ color: 'white' }}>Updated Successfully</h3>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>Your credentials have been updated.</p>
                        <button onClick={onClose} style={{ background: '#333', color: 'white', border: 'none', padding: '0.8rem 2rem', cursor: 'pointer' }}>
                            CLOSE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecurityModal;
