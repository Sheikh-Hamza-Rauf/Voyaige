import React from 'react'; 
import './RestaurantsSection.css';

const cityRestaurants = {
    Islamabad: [
        { name: "Monal Islamabad", rating: 4.7, reviews: 1520, price: "$$$", image: "path_to_monal_image.jpg" },
        { name: "Savour Foods", rating: 4.5, reviews: 3100, price: "$", image: "path_to_savour_foods_image.jpg" },
        { name: "Texas Steakhouse", rating: 4.6, reviews: 750, price: "$$$", image: "path_to_texas_steakhouse_image.jpg" },
        { name: "Tuscany Courtyard", rating: 4.4, reviews: 900, price: "$$$", image: "path_to_tuscany_image.jpg" },
        { name: "Chaye Khana", rating: 4.3, reviews: 800, price: "$$", image: "path_to_chaye_khana_image.jpg" },
        { name: "Burning Brownie", rating: 4.6, reviews: 500, price: "$$", image: "path_to_burning_brownie_image.jpg" }
    ],
    Lahore: [
        { name: "Café Aylanto", rating: 4.7, reviews: 1200, price: "$$$", image: "path_to_aylanto_image.jpg" },
        { name: "Butt Karahi", rating: 4.5, reviews: 2500, price: "$$", image: "path_to_butt_karahi_image.jpg" },
        { name: "Andaaz Restaurant", rating: 4.8, reviews: 1100, price: "$$$$", image: "path_to_andaaz_image.jpg" },
        { name: "Salt'n Pepper", rating: 4.6, reviews: 1300, price: "$$", image: "path_to_salt_n_pepper_image.jpg" },
        { name: "Spice Bazaar", rating: 4.5, reviews: 900, price: "$$$", image: "path_to_spice_bazaar_image.jpg" },
        { name: "Rina's Kitchenette", rating: 4.6, reviews: 780, price: "$$", image: "path_to_rinas_image.jpg" }
    ],
    Karachi: [
        { name: "Kolachi Restaurant", rating: 4.8, reviews: 2000, price: "$$$", image: "path_to_kolachi_image.jpg" },
        { name: "Okra Restaurant", rating: 4.7, reviews: 1300, price: "$$$$", image: "path_to_okra_image.jpg" },
        { name: "Lal Qila", rating: 4.5, reviews: 1800, price: "$$$", image: "path_to_lal_qila_image.jpg" },
        { name: "The Patio", rating: 4.6, reviews: 900, price: "$$$", image: "path_to_patio_image.jpg" },
        { name: "Pompei", rating: 4.6, reviews: 650, price: "$$$$", image: "path_to_pompei_image.jpg" },
        { name: "Kababs And Curries", rating: 4.4, reviews: 500, price: "$$", image: "path_to_kababs_curries_image.jpg" }
    ],
    Murree: [
        { name: "The Monal Murree", rating: 4.8, reviews: 950, price: "$$$", image: "path_to_monal_murree_image.jpg" },
        { name: "Almaza Hotel", rating: 4.6, reviews: 800, price: "$$$", image: "path_to_almaza_image.jpg" },
        { name: "Shangrila Resort", rating: 4.5, reviews: 600, price: "$$$$", image: "path_to_shangrila_image.jpg" },
        { name: "Murree Lodge", rating: 4.4, reviews: 700, price: "$$", image: "path_to_murree_lodge_image.jpg" },
        { name: "Hilltop Restaurant", rating: 4.3, reviews: 500, price: "$$", image: "path_to_hilltop_image.jpg" },
        { name: "Pindi Point Restaurant", rating: 4.5, reviews: 600, price: "$$", image: "path_to_pindi_point_image.jpg" }
    ],
    Peshawar: [
        { name: "Chief Burger", rating: 4.5, reviews: 1200, price: "$", image: "path_to_chief_burger_image.jpg" },
        { name: "Bela Restaurant", rating: 4.6, reviews: 800, price: "$$", image: "path_to_bela_image.jpg" },
        { name: "Charasi Tikka", rating: 4.4, reviews: 1300, price: "$$", image: "path_to_charasi_image.jpg" },
        { name: "Habibi Restaurant", rating: 4.5, reviews: 950, price: "$$", image: "path_to_habibi_image.jpg" },
        { name: "Namak Mandi", rating: 4.6, reviews: 1450, price: "$$", image: "path_to_namak_mandi_image.jpg" },
        { name: "Pizza Hut", rating: 4.3, reviews: 500, price: "$$", image: "path_to_pizza_hut_image.jpg" }
    ],
    Skardu: [
        { name: "Skardu Cafe", rating: 4.7, reviews: 850, price: "$$", image: "path_to_skardu_cafe_image.jpg" },
        { name: "Shangrila Resort Skardu", rating: 4.6, reviews: 600, price: "$$$$", image: "path_to_shangrila_skardu_image.jpg" },
        { name: "Kachura Lake Restaurant", rating: 4.5, reviews: 700, price: "$$$", image: "path_to_kachura_image.jpg" },
        { name: "Hunza View Restaurant", rating: 4.8, reviews: 500, price: "$$", image: "path_to_hunza_view_image.jpg" },
        { name: "Shamozai Restaurant", rating: 4.4, reviews: 450, price: "$$", image: "path_to_shamozai_image.jpg" },
        { name: "Mountain View Restaurant", rating: 4.3, reviews: 400, price: "$$", image: "path_to_mountain_view_image.jpg" }
    ],
    Hunza: [
        { name: "Hunza View Hotel", rating: 4.7, reviews: 900, price: "$$$", image: "path_to_hunza_view_image.jpg" },
        { name: "Eagles Nest Hotel", rating: 4.6, reviews: 750, price: "$$$$", image: "path_to_eagles_nest_image.jpg" },
        { name: "Hunza Inn", rating: 4.5, reviews: 800, price: "$$", image: "path_to_hunza_inn_image.jpg" },
        { name: "Gulmit Hotel", rating: 4.4, reviews: 500, price: "$$", image: "path_to_gulmit_image.jpg" },
        { name: "Karimabad Restaurant", rating: 4.3, reviews: 600, price: "$$", image: "path_to_karimabad_image.jpg" },
        { name: "Baltit Inn", rating: 4.5, reviews: 400, price: "$$", image: "path_to_baltit_inn_image.jpg" }
    ],
    Quetta: [
        { name: "Serena Hotel Quetta", rating: 4.5, reviews: 850, price: "$$$$", image: "path_to_serena_quetta_image.jpg" },
        { name: "Quetta Hotel", rating: 4.6, reviews: 600, price: "$$", image: "path_to_quetta_hotel_image.jpg" },
        { name: "Seyah Hotel", rating: 4.4, reviews: 550, price: "$$", image: "path_to_seyah_image.jpg" },
        { name: "Balochistan Restaurant", rating: 4.5, reviews: 500, price: "$$", image: "path_to_balochistan_image.jpg" },
        { name: "Hotel Al-Makkah", rating: 4.3, reviews: 400, price: "$$", image: "path_to_al_makkah_image.jpg" },
        { name: "Quetta Grill", rating: 4.2, reviews: 350, price: "$$", image: "path_to_quetta_grill_image.jpg" }
    ],
    Multan: [
        { name: "Sethi's Delight", rating: 4.7, reviews: 850, price: "$$", image: "path_to_sethis_image.jpg" },
        { name: "Bundu Khan Multan", rating: 4.6, reviews: 980, price: "$$$", image: "path_to_bundu_khan_image.jpg" },
        { name: "Shaikh BBQ", rating: 4.5, reviews: 750, price: "$$", image: "path_to_shaikh_bbq_image.jpg" },
        { name: "Salt'n Pepper Multan", rating: 4.6, reviews: 700, price: "$$", image: "path_to_salt_n_pepper_multan_image.jpg" },
        { name: "Zanzibar", rating: 4.5, reviews: 650, price: "$$$", image: "path_to_zanzibar_image.jpg" },
        { name: "Chicken Cottage", rating: 4.3, reviews: 500, price: "$$", image: "path_to_chicken_cottage_image.jpg" }
    ],
    Faisalabad: [
        { name: "Faisalabad Restaurant", rating: 4.5, reviews: 700, price: "$$", image: "path_to_faisalabad_restaurant_image.jpg" },
        { name: "Royal Palm Restaurant", rating: 4.6, reviews: 600, price: "$$$", image: "path_to_royal_palm_image.jpg" },
        { name: "Nawab Restaurant", rating: 4.4, reviews: 500, price: "$$", image: "path_to_nawab_image.jpg" },
        { name: "Khan Restaurant", rating: 4.3, reviews: 450, price: "$$", image: "path_to_khan_image.jpg" },
        { name: "Spice House Faisalabad", rating: 4.5, reviews: 400, price: "$$", image: "path_to_spice_house_image.jpg" },
        { name: "Faisalabad Grill", rating: 4.2, reviews: 350, price: "$$", image: "path_to_faisalabad_grill_image.jpg" }
    ]
};

const RestaurantsSection = ({ cityName = "Islamabad" }) => {
    const restaurants = cityRestaurants[cityName] || cityRestaurants["Islamabad"]; // Fallback to Islamabad if no city found

    return (
        <section className="restaurants-section">
            <div className="section-header">
                <h2>Best Places to Eat in {cityName}</h2>
            </div>
            <div className="restaurants-list">
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant-card">
                        <div className="restaurant-image" style={{ backgroundImage: `url(${restaurant.image})` }}>
                            <button className="favorite-button"><i className="fa fa-heart" /></button>
                        </div>
                        <div className="restaurant-info">
                            <h3>{restaurant.name}</h3>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`star ${i < Math.floor(restaurant.rating) ? 'filled' : ''}`}>★</span>
                                ))}
                                <span className="review-count">{restaurant.reviews}</span>
                            </div>
                            <p className="price-range">{restaurant.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RestaurantsSection;
