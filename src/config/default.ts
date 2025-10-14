export const config = {
    port: process.env.PORT || 4000,
    databaseUrl: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/security_pulse",
};
