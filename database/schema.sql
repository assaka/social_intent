-- Users table
CREATE TABLE users (
                       id VARCHAR PRIMARY KEY,
                       email VARCHAR UNIQUE NOT NULL,
                       name VARCHAR,
                       picture VARCHAR,
                       access_token TEXT,
                       refresh_token TEXT,
                       created_at TIMESTAMP DEFAULT NOW(),
                       updated_at TIMESTAMP DEFAULT NOW()
);

-- Audits table
CREATE TABLE audits (
                        id VARCHAR PRIMARY KEY,
                        url VARCHAR NOT NULL,
                        user_id VARCHAR REFERENCES users(id),
                        audit_type VARCHAR NOT NULL DEFAULT 'full',
                        status VARCHAR NOT NULL DEFAULT 'pending',
                        results JSONB,
                        error TEXT,
                        created_at TIMESTAMP DEFAULT NOW(),
                        completed_at TIMESTAMP
);

-- GTM Accounts table
CREATE TABLE gtm_accounts (
                              id SERIAL PRIMARY KEY,
                              user_id VARCHAR REFERENCES users(id),
                              account_id VARCHAR NOT NULL,
                              container_id VARCHAR NOT NULL,
                              account_name VARCHAR,
                              container_name VARCHAR,
                              created_at TIMESTAMP DEFAULT NOW(),
                              UNIQUE(user_id, account_id, container_id)
);

-- Indexes for performance
CREATE INDEX idx_audits_user_id ON audits(user_id);
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_audits_created_at ON audits(created_at);
CREATE INDEX idx_gtm_accounts_user_id ON gtm_accounts(user_id);