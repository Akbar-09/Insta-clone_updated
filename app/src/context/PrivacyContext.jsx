import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getBlockedUsers, blockUser as blockUserApi, unblockUser as unblockUserApi } from '../api/privacyApi';
import { restrictUser as restrictUserApi, unrestrictUser as unrestrictUserApi, getRestrictedUsers } from '../api/userApi';
import { useAuth } from './AuthContext';

const PrivacyContext = createContext();

export const usePrivacy = () => useContext(PrivacyContext);

export const PrivacyProvider = ({ children }) => {
    const { user } = useAuth();
    const [blockedIds, setBlockedIds] = useState(new Set());
    const [restrictedIds, setRestrictedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    const fetchPrivacyData = useCallback(async () => {
        if (!user) {
            setBlockedIds(new Set());
            setRestrictedIds(new Set());
            setLoading(false);
            return;
        }

        try {
            const [blockedRes, restrictedRes] = await Promise.all([
                getBlockedUsers(),
                getRestrictedUsers()
            ]);

            if (blockedRes.data.status === 'success') {
                const ids = new Set(blockedRes.data.data.map(u => String(u.userId)));
                setBlockedIds(ids);
            }

            if (restrictedRes.data.status === 'success') {
                const ids = new Set(restrictedRes.data.data.map(u => String(u.userId)));
                setRestrictedIds(ids);
            }
        } catch (error) {
            console.error('Failed to fetch privacy data', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchPrivacyData();
    }, [fetchPrivacyData]);

    const isUserBlocked = useCallback((userId) => {
        return blockedIds.has(String(userId));
    }, [blockedIds]);

    const isUserRestricted = useCallback((userId) => {
        return restrictedIds.has(String(userId));
    }, [restrictedIds]);

    const block = async (userId) => {
        try {
            await blockUserApi(userId);
            setBlockedIds(prev => {
                const updated = new Set(prev);
                updated.add(String(userId));
                return updated;
            });
            return true;
        } catch (error) {
            console.error('Block failed', error);
            throw error;
        }
    };

    const unblock = async (userId) => {
        try {
            await unblockUserApi(userId);
            setBlockedIds(prev => {
                const updated = new Set(prev);
                updated.delete(String(userId));
                return updated;
            });
            return true;
        } catch (error) {
            console.error('Unblock failed', error);
            throw error;
        }
    };

    const restrict = async (userId) => {
        try {
            await restrictUserApi(userId);
            setRestrictedIds(prev => {
                const updated = new Set(prev);
                updated.add(String(userId));
                return updated;
            });
            return true;
        } catch (error) {
            console.error('Restrict failed', error);
            throw error;
        }
    };

    const unrestrict = async (userId) => {
        try {
            await unrestrictUserApi(userId);
            setRestrictedIds(prev => {
                const updated = new Set(prev);
                updated.delete(String(userId));
                return updated;
            });
            return true;
        } catch (error) {
            console.error('Unrestrict failed', error);
            throw error;
        }
    };

    return (
        <PrivacyContext.Provider value={{
            blockedIds,
            restrictedIds,
            isUserBlocked,
            isUserRestricted,
            block,
            unblock,
            restrict,
            unrestrict,
            loading
        }}>
            {children}
        </PrivacyContext.Provider>
    );
};
