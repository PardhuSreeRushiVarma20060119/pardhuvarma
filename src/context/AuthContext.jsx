import React, { createContext, useContext, useState, useEffect } from 'react';
import * as OTPAuth from 'otpauth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminMode, setAdminMode] = useState(false);

    // Auth Config State (Password hash/string, TOTP secret)
    const [authConfig, setAuthConfig] = useState({
        password: 'admin', // Default initial password
        totpSecret: null,
        isSetup: false
    });

    // Load Session & Config on Mount
    useEffect(() => {
        const session = localStorage.getItem('admin_session');
        if (session === 'active') {
            setIsAdmin(true);
            setAdminMode(true);
        }

        const storedConfig = localStorage.getItem('portfolio_auth_config');
        if (storedConfig) {
            setAuthConfig(JSON.parse(storedConfig));
        } else {
            // First run, save default
            localStorage.setItem('portfolio_auth_config', JSON.stringify({
                password: 'admin',
                totpSecret: null,
                isSetup: false
            }));
        }
    }, []);

    const login = (password) => {
        if (password === authConfig.password) {
            setIsAdmin(true);
            setAdminMode(true);
            localStorage.setItem('admin_session', 'active');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        setAdminMode(false);
        localStorage.removeItem('admin_session');
    };

    const toggleAdminMode = () => {
        if (isAdmin) setAdminMode(prev => !prev);
    };

    // --- Security Methods ---

    const verifyPassword = (inputPass) => {
        return inputPass === authConfig.password;
    };

    const generateTOTPSecret = () => {
        // Generate a random secret (base32)
        const secret = new OTPAuth.Secret({ size: 20 });
        return secret.base32;
    };

    const verifyTOTP = (token, secretOverride = null) => {
        const secret = secretOverride || authConfig.totpSecret;
        if (!secret) return false; // Cannot verify if no secret

        const totp = new OTPAuth.TOTP({
            issuer: 'PardhuPortfolio',
            label: 'Admin',
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secret)
        });

        const delta = totp.validate({ token, window: 1 });
        return delta !== null;
    };

    const updateCredentials = (newPassword, newSecret = null) => {
        const newConfig = {
            ...authConfig,
            password: newPassword,
            isSetup: true
        };
        if (newSecret) {
            newConfig.totpSecret = newSecret;
        }

        setAuthConfig(newConfig);
        localStorage.setItem('portfolio_auth_config', JSON.stringify(newConfig));
        return true;
    };

    const hasTOTP = () => !!authConfig.totpSecret;

    return (
        <AuthContext.Provider value={{
            isAdmin, adminMode,
            login, logout, toggleAdminMode,
            verifyPassword, generateTOTPSecret, verifyTOTP, updateCredentials, hasTOTP
        }}>
            {children}
        </AuthContext.Provider>
    );
};
