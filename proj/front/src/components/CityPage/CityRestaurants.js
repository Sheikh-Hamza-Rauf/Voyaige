import React from 'react'; 
import './RestaurantsSection.css';

const cityRestaurants = {
    Islamabad: [
        { name: "Burger In Town", rating: 4.7, reviews: 1520, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/0b/29/ec/burger-in-town-serving.jpg?w=1400&h=800&s=1" },
        { name: "1969", rating: 4.5, reviews: 3100, price: "$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c0/90/4f/photo0jpg.jpg?w=1800&h=1000&s=1" },
        { name: "Asian Wok Beverly Center", rating: 4.6, reviews: 750, price: "$$$", image: "https://media-cdn.tripadvisor.com/media/photo-s/12/e6/12/22/main-enterance.jpg" },
        { name: "Savour Foods", rating: 4.4, reviews: 900, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/5b/9a/e8/photo0jpg.jpg?w=1800&h=1000&s=1" },
        { name: "Nouba", rating: 4.3, reviews: 800, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/ce/a4/e0/ambience.jpg?w=1400&h=800&s=1" },
        { name: "Burning Brownie", rating: 4.6, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/05/44/37/burning-brownie.jpg?w=1400&h=800&s=1" }
    ],
    Lahore: [
        { name: "Café Aylanto", rating: 4.7, reviews: 1200, price: "$$$", image: "https://d2liqplnt17rh6.cloudfront.net/coverImages/Coveraylanto_82e7b65f-8a42-4cdf-a612-71edea6372b4-559.jpeg" },
        { name: "Monal Lahore", rating: 4.5, reviews: 2500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/3a/1d/45/img-20190913-141114-largejpg.jpg?w=900&h=-1&s=1" },
        { name: "Andaaz Restaurant", rating: 4.8, reviews: 1100, price: "$$$$", image: "https://media-cdn.tripadvisor.com/media/photo-s/16/17/86/02/andaaz-restaurant.jpg" },
        { name: "Salt'n Pepper", rating: 4.6, reviews: 1300, price: "$$", image: "https://images-beta.tossdown.com/site/11771dbf-36a1-4684-a55e-18af61e0f77c.webp" },
        { name: "Spice Bazaar", rating: 4.5, reviews: 900, price: "$$$", image: "https://sunday.com.pk/wp-content/uploads/2020/11/spice-bazaar-dha-hi-tea-lunch-dinner-phase-6-5-scaled.jpg" },
        { name: "Arcadian Cafe Packages Mall", rating: 4.6, reviews: 780, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/de/12/af/arcadian-packages-mall.jpg?w=1800&h=1000&s=1" }
    ],
    Karachi: [
        { name: "Lotus Court", rating: 4.8, reviews: 2000, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/6d/2d/0b/lotus-court.jpg?w=1400&h=800&s=1" },
        { name: "Xander's", rating: 4.7, reviews: 1300, price: "$$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/e7/d3/5b/getlstd-property-photo.jpg?w=1000&h=600&s=1" },
        { name: "Lal Qila", rating: 4.5, reviews: 1800, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/ac/60/0b/lal-qila-at-the-end-of.jpg?w=1800&h=-1&s=1" },
        { name: "Al Bustan", rating: 4.6, reviews: 900, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/6d/29/de/al-bustan.jpg?w=1400&h=800&s=1" },
        { name: "Ammos", rating: 4.6, reviews: 650, price: "$$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d4/77/bf/ammos-very-amazing-ambiance.jpg?w=1400&h=800&s=1" },
        { name: "Mirchili", rating: 4.4, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d0/87/23/photo0jpg.jpg?w=1400&h=800&s=1" }
    ],
    Murree: [
        { name: "thaali- a traditional cuisine", rating: 4.8, reviews: 950, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/d3/08/4e/getlstd-property-photo.jpg?w=900&h=500&s=1" },
        { name: "Monal Murree", rating: 4.6, reviews: 800, price: "$$$", image: "https://murreetoday.com/wp-content/uploads/2023/02/The-Monal.jpg" },
        { name: "Des Pardes", rating: 4.5, reviews: 600, price: "$$$$", image: "https://murreetoday.com/wp-content/uploads/2023/02/Des-Perdais.jpg" },
        { name: "Gloria Jeans Coffees", rating: 4.4, reviews: 700, price: "$$", image: "https://murreetoday.com/wp-content/uploads/2023/02/Gloria-Jeans-Murree.jpg" },
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
        { name: "Ramada Multan", rating: 4.7, reviews: 850, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/aa/f9/ac/located-in-the-heart.jpg?w=1400&h=800&s=1" },
        { name: "Bundu Khan Multan", rating: 4.6, reviews: 980, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/18/47/fa/outside-sign-at-night.jpg?w=2000&h=-1&s=1" },
        { name: "Shahjahan Grill", rating: 4.5, reviews: 750, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4d/11/94/exterior-facade.jpg?w=2000&h=-1&s=1" },
        { name: "Midtown Diners", rating: 4.6, reviews: 700, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/e9/8c/cd/mtd-outside.jpg?w=1400&h=800&s=1" },
        { name: "Chaaye Khana", rating: 4.5, reviews: 650, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/37/b2/61/view-from-the-street.jpg?w=1400&h=800&s=1" },
        { name: "London Courtyard", rating: 4.3, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c2/0f/e3/photo1jpg.jpg?w=1800&h=1000&s=1" }
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
