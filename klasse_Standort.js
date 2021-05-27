class Standort{
    constructor(la, lo, name, type, adress, bild, creditor, division, partner_since_year, purchasing_volume, estimated_leverage, employees_female, employees_male, audit_type, fair_wear_audit,
        last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation, port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint) {

    this.la = la;
    this.lo = lo;
    this.name = name;
    this.type = type;
    this.adress = adress;
    this.bild = bild;
    this.creditor = creditor;
    this.division = division;
    this.partner_since_year = partner_since_year;
    this.purchasing_volume = purchasing_volume;
    this.estimated_leverage = estimated_leverage;
    this.employees_female = employees_female;
    this.employees_male = employees_male;
    this.audit_type = audit_type;
    this.fair_wear_audit = fair_wear_audit;
    this.last_fair_wear_training = last_fair_wear_training;
    this.sci_id = bsci_id;
    this.wrap_id = wrap_id;
    this.complaints = complaints;
    this.certificates = certificates;
    this.mode_of_transportation = mode_of_transportation;
    this.port_name = port_name;
    this.port_coordinates_latitude = port_coordinates_latitude;
    this.port_coordinates_longitude = port_coordinates_latitude;
    this.warehouse_name = warehouse_name;
    this.carbon_footprint = carbon_footprint;
    }

    get_name() {
        return this.name;
    }
}   