export interface bodyTransfer {
    "acceptance_token": string ,
    "amount_in_cents": number,
    "currency": string,
    "customer_email": string,
    "reference": string,
    "customer_data": {
        "legal_id": string,
        "full_name": string,
        "phone_number": string,
        "legal_id_type": string
    },
    "payment_method": {
        "type": string,
        "user_type": string,
        "payment_description":string,
        "sandbox_status": string
    }
}