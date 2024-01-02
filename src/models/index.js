const Auth = {
    App: require("./auth.app"),
    Secret: require("./auth.secret")
}

const Core = {
    Organization: require("./core.org"),
    Team: require("./core.team"),
    User: require("./core.user")
}

const DNS = {
    Domain: require("./dns.domain"),
    Record: require("./dns.record")
}

// Organization (1) <-> (N) Domain
Core.Organization.hasMany(DNS.Domain, {
    foreignKey: "organizationId",
    as: "domains"
});

DNS.Domain.belongsTo(Core.Organization, {
    foreignKey: "organizationId",
    as: "organization"
});

// Domain (1) <-> (N) Record
DNS.Domain.hasMany(DNS.Record, {
    foreignKey: "domainId",
    as: "records"
});

DNS.Record.belongsTo(DNS.Domain, {
    foreignKey: "domainId",
    as: "domain"
});

// Team (m) <-> (n) User
Core.Team.belongsToMany(Core.User, {
    through: "team_user",
    foreignKey: "teamId",
    as: "users"
});

Core.User.belongsToMany(Core.Team, {
    through: "team_user",
    foreignKey: "userId",
    as: "teams"
});

// Organization (1) <-> (N) Team
Core.Organization.hasMany(Core.Team, {
    foreignKey: "organizationId",
    as: "teams"
});

Core.Team.belongsTo(Core.Organization, {
    foreignKey: "organizationId",
    as: "organization"
});

// Teams (m) <-> (n) Domains
Core.Team.belongsToMany(DNS.Domain, {
    through: "team_domain",
    foreignKey: "teamId",
    as: "domains"
});

DNS.Domain.belongsToMany(Core.Team, {
    through: "team_domain",
    foreignKey: "domainId",
    as: "teams"
});

// App (1) <-> (N) Secret
Auth.App.hasMany(Auth.Secret, {
    foreignKey: "appId",
    as: "secrets"
});

Auth.Secret.belongsTo(Auth.App, {
    foreignKey: "appId",
    as: "app"
});

// Organization (1) <-> (N) App
Core.Organization.hasMany(Auth.App, {
    foreignKey: "organizationId",
    as: "apps"
});

Auth.App.belongsTo(Core.Organization, {
    foreignKey: "organizationId",
    as: "organization"
});

// User (1) <-> (N) App
Core.User.hasMany(Auth.App, {
    foreignKey: "createdBy",
    as: "apps"
});

Auth.App.belongsTo(Core.User, {
    foreignKey: "createdBy",
    as: "createdByUser"
});

// User (1) <-> (N) Secret
Core.User.hasMany(Auth.Secret, {
    foreignKey: "createdBy",
    as: "secrets"
});

Auth.Secret.belongsTo(Core.User, {
    foreignKey: "createdBy",
    as: "createdByUser"
});

module.exports = { 
    Auth,
    Core,
    DNS,
};