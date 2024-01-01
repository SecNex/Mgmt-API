const DNS = {
    Domain: require("./domain.dns"),
    Record: require("./record.dns")
}

// Domain (1) <-> (N) Record
DNS.Domain.hasMany(DNS.Record, {
    foreignKey: "domainId",
    as: "records"
});

DNS.Record.belongsTo(DNS.Domain, {
    foreignKey: "domainId",
    as: "domain"
});

module.exports = { 
    DNS,
};