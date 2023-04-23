export interface createOrderDetails {
    pickup:               Pickup;
    dropoff:              Dropoff;
    delivery_mode:        string;
    created_date:         string;
    pick_up_time:         string;
    payment:              Payment;
    distance_KM:          number;
    est_deliver_time_min: number;
    delivery_cost:        number;
}

export interface Dropoff {
    drop_recipient_name:    string;
    drop_recipient_address: string;
    drop_recipient_city:   string;
    drop_recipient_county:   string;
    drop_recipient_eircode:   string;
    drop_recipient_phone:   number;
}

export interface Payment {
    payment_type: string;
    payer ?: string;
}
export interface Pickup {
    pick_recipient_name:    string;
    pick_recipient_address: string;
    pick_recipient_city:   string;
    pick_recipient_county:   string;
    pick_recipient_eircode:   string;
    pick_recipient_phone:   number;
}
