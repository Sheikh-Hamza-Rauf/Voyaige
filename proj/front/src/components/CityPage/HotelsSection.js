import React from 'react';
import './HotelsSection.css';

const cityHotels = {
    Islamabad: [
        { name: "Hotel Hillview Islamabad", rating: 4.5, reviews: 263, price: 82, image: "path_to_hillview_image.jpg" },
        { name: "The 108 Hotel", rating: 5, reviews: 153, price: null, image: "path_to_108_hotel_image.jpg" },
        { name: "Ramada by Wyndham Islamabad", rating: 4.5, reviews: 573, price: 130, image: "path_to_ramada_image.jpg" },
        { name: "Islamabad Serena Hotel", rating: 4.5, reviews: 1030, price: 270, image: "path_to_serena_image.jpg" },
        { name: "Islamabad Marriott Hotel", rating: 4, reviews: 590, price: 181, image: "path_to_marriott_image.jpg" },
        { name: "Best Western Premier Islamabad", rating: 4, reviews: 59, price: null, image: "path_to_best_western_image.jpg" }
    ],
    Lahore: [
        { name: "Pearl Continental Lahore", rating: 4.7, reviews: 1200, price: 200, image: "path_to_pc_lahore_image.jpg" },
        { name: "Nishat Hotel Lahore", rating: 4.5, reviews: 850, price: 150, image: "path_to_nishat_lahore_image.jpg" },
        { name: "Avari Lahore", rating: 4.4, reviews: 780, price: 130, image: "path_to_avari_lahore_image.jpg" },
        { name: "Hotel One Gulberg", rating: 4.3, reviews: 450, price: 80, image: "path_to_hotel_one_gulberg_image.jpg" },
        { name: "Hospitality Inn Lahore", rating: 4.2, reviews: 320, price: 90, image: "path_to_hospitality_inn_image.jpg" },
        { name: "Royal Swiss Lahore", rating: 4.4, reviews: 290, price: 110, image: "path_to_royal_swiss_lahore_image.jpg" }
    ],
    Karachi: [
        { name: "Pearl Continental Karachi", rating: 4.6, reviews: 980, price: 190, image: "path_to_pc_karachi_image.jpg" },
        { name: "Movenpick Hotel Karachi", rating: 4.5, reviews: 760, price: 170, image: "path_to_movenpick_karachi_image.jpg" },
        { name: "Marriott Karachi", rating: 4.4, reviews: 850, price: 160, image: "path_to_marriott_karachi_image.jpg" },
        { name: "Avari Towers Karachi", rating: 4.3, reviews: 670, price: 140, image: "path_to_avari_towers_karachi_image.jpg" },
        { name: "Hotel Crown Inn", rating: 4.2, reviews: 340, price: 80, image: "path_to_crown_inn_image.jpg" },
        { name: "Beach Luxury Hotel", rating: 4.1, reviews: 420, price: 100, image: "path_to_beach_luxury_image.jpg" }
    ],
    Murree: [
        { name: "Lockwood Hotel Murree", rating: 4.3, reviews: 350, price: 85, image: "path_to_lockwood_image.jpg" },
        { name: "Shangrila Resort Murree", rating: 4.5, reviews: 400, price: 110, image: "path_to_shangrila_image.jpg" },
        { name: "Hotel One Murree", rating: 4.2, reviews: 280, price: 75, image: "path_to_hotel_one_murree_image.jpg" },
        { name: "Grand Taj Hotel", rating: 4, reviews: 150, price: 60, image: "path_to_grand_taj_image.jpg" },
        { name: "Metropole Hotel Murree", rating: 4.1, reviews: 220, price: 90, image: "path_to_metropole_image.jpg" },
        { name: "The Smart Hotel Murree", rating: 4.3, reviews: 290, price: 100, image: "path_to_smart_hotel_image.jpg" }
    ],
    Peshawar: [
        { name: "Pearl Continental Peshawar", rating: 4.5, reviews: 500, price: 150, image: "path_to_pc_peshawar_image.jpg" },
        { name: "Shelton's Rezidor Peshawar", rating: 4.4, reviews: 380, price: 120, image: "path_to_sheltons_image.jpg" },
        { name: "Fort Continental Hotel", rating: 4.3, reviews: 250, price: 100, image: "path_to_fort_continental_image.jpg" },
        { name: "VIP House", rating: 4.1, reviews: 180, price: 75, image: "path_to_vip_house_image.jpg" },
        { name: "Hotel Grand Peshawar", rating: 4.2, reviews: 140, price: 80, image: "path_to_grand_peshawar_image.jpg" },
        { name: "Greens Hotel Peshawar", rating: 4, reviews: 120, price: 70, image: "path_to_greens_image.jpg" }
    ],
    Skardu: [
        { name: "Shangrila Resort Skardu", rating: 4.8, reviews: 700, price: 180, image: "path_to_shangrila_skardu_image.jpg" },
        { name: "Serena Shigar Fort", rating: 4.9, reviews: 650, price: 220, image: "path_to_serena_shigar_image.jpg" },
        { name: "Hotel Reego", rating: 4.7, reviews: 430, price: 150, image: "path_to_reego_image.jpg" },
        { name: "Baltistan Continental Hotel", rating: 4.5, reviews: 310, price: 130, image: "path_to_baltistan_image.jpg" },
        { name: "Skardu Viewpoint Hotel", rating: 4.3, reviews: 250, price: 90, image: "path_to_viewpoint_image.jpg" },
        { name: "Mountain Lodge Skardu", rating: 4.6, reviews: 290, price: 100, image: "path_to_mountain_lodge_image.jpg" }
    ],
    Hunza: [
        { name: "Hunza Serena Inn", rating: 4.9, reviews: 600, price: 150, image: "path_to_serena_inn_image.jpg" },
        { name: "Eagle's Nest Hotel", rating: 4.8, reviews: 520, price: 180, image: "path_to_eagles_nest_image.jpg" },
        { name: "Hunza Embassy Hotel", rating: 4.6, reviews: 400, price: 120, image: "path_to_embassy_image.jpg" },
        { name: "Hotel Mountain Track", rating: 4.4, reviews: 350, price: 100, image: "path_to_mountain_track_image.jpg" },
        { name: "Baltit Heritage Inn", rating: 4.5, reviews: 320, price: 110, image: "path_to_baltit_heritage_image.jpg" },
        { name: "The Hunza View Hotel", rating: 4.7, reviews: 480, price: 140, image: "path_to_hunza_view_image.jpg" }
    ],
    Quetta: [
        { name: "Quetta Serena Hotel", rating: 4.7, reviews: 800, price: 190, image: "path_to_serena_quetta_image.jpg" },
        { name: "Bloom Star Hotel", rating: 4.2, reviews: 270, price: 70, image: "path_to_bloom_star_image.jpg" },
        { name: "Hotel Deluxe Quetta", rating: 4.1, reviews: 210, price: 60, image: "path_to_hotel_deluxe_image.jpg" },
        { name: "Al Makkah Hotel", rating: 4, reviews: 180, price: 55, image: "path_to_al_makkah_image.jpg" },
        { name: "Quetta Hotel International", rating: 4.3, reviews: 320, price: 100, image: "path_to_quetta_international_image.jpg" },
        { name: "New Super Paradise Hotel", rating: 4.1, reviews: 140, price: 80, image: "path_to_super_paradise_image.jpg" }
    ],
    Multan: [
        { name: "Ramada Multan", rating: 4.6, reviews: 700, price: 140, image: "path_to_ramada_multan_image.jpg" },
        { name: "Avari Xpress Multan", rating: 4.5, reviews: 500, price: 130, image: "path_to_avari_xpress_image.jpg" },
        { name: "Hotel One Multan", rating: 4.3, reviews: 300, price: 90, image: "path_to_hotel_one_multan_image.jpg" },
        { name: "Shangrila Boutique Hotel", rating: 4.4, reviews: 320, price: 110, image: "path_to_shangrila_boutique_image.jpg" },
        { name: "Hotel Grace Inn Multan", rating: 4.2, reviews: 280, price: 70, image: "path_to_grace_inn_image.jpg" },
        { name: "Multan Continental Hotel", rating: 4.1, reviews: 250, price: 100, image: "path_to_multan_continental_image.jpg" }
    ],
    Faisalabad: [
        { name: "Faisalabad Serena Hotel", rating: 4.7, reviews: 900, price: 180, image: "path_to_serena_faisalabad_image.jpg" },
        { name: "Grand Regent Hotel and Suites", rating: 4.5, reviews: 650, price: 150, image: "path_to_grand_regent_image.jpg" },
        { name: "Hotel One Faisalabad", rating: 4.3, reviews: 500, price: 120, image: "path_to_hotel_one_faisalabad_image.jpg" },
        { name: "Royalton Hotel Faisalabad", rating: 4.2, reviews: 320, price: 100, image: "path_to_royalton_image.jpg" },
        { name: "Usmania Royal Hotel", rating: 4.1, reviews: 280, price: 90, image: "path_to_usmania_royal_image.jpg" },
        { name: "Grand Hotel Faisalabad", rating: 4.4, reviews: 450, price: 140, image: "path_to_grand_hotel_faisalabad_image.jpg" }
    ]
};

const HotelsSection = ({ cityName = "Islamabad" }) => {
    const hotels = cityHotels[cityName] || cityHotels["Islamabad"]; // Fallback to Islamabad if no city found

    return (
        <section className="hotels-section">
            <div className="section-header">
                <h2>Places to stay in {cityName}</h2>
            </div>
            <div className="hotels-list">
                {hotels.map((hotel, index) => (
                    <div key={index} className="hotel-card">
                        <div className="hotel-image" style={{ backgroundImage: `url(${hotel.image})` }}>
                            <button className="favorite-button"><i className="fa fa-heart" /></button>
                            <div className="image-dots">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`dot ${i === 0 ? 'active' : ''}`}></span>
                                ))}
                            </div>
                        </div>
                        <div className="hotel-info">
                            <h3>{hotel.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(hotel.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">{hotel.reviews}</span>
                            </div>
                            {hotel.price && (
                                <p className="price">from ${hotel.price}/night</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HotelsSection;
