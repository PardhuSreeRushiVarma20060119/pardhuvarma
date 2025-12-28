import { useState, useEffect } from 'react';

const cache = {};

export const useGitHubStats = (repoUrl) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!repoUrl || !repoUrl.includes('github.com')) return;

        // "https://github.com/user/repo" -> "user/repo"
        const repoPath = repoUrl.replace('https://github.com/', '').replace(/\/$/, '');

        if (cache[repoPath]) {
            setStats(cache[repoPath]);
            return;
        }

        setLoading(true);
        fetch(`https://api.github.com/repos/${repoPath}`)
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    const extracted = {
                        stars: data.stargazers_count,
                        forks: data.forks_count,
                        issues: data.open_issues_count,
                        desc: data.description,
                        language: data.language,
                        lastUpdated: new Date(data.updated_at).toLocaleDateString()
                    };
                    cache[repoPath] = extracted;
                    setStats(extracted);
                }
            })
            .catch(err => console.error("GitHub Fetch Error:", err))
            .finally(() => setLoading(false));

    }, [repoUrl]);

    return { stats, loading };
};
