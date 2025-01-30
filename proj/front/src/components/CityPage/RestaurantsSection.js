import React from 'react'; 
import './RestaurantsSection.css';

const cityRestaurants = {
    Islamabad: [
        { name: "1969 Restaurant", rating: 4.7, reviews: 1520, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c0/90/4f/photo0jpg.jpg?w=2000&h=-1&s=1" },
        { name: "chaayé khana", rating: 4.5, reviews: 3100, price: "$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/48/63/6d/chaaye-khana.jpg?w=1100&h=-1&s=1" },
        { name: "Burger In Town", rating: 4.6, reviews: 750, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/0b/29/ec/burger-in-town-serving.jpg?w=1400&h=800&s=1" },
        { name: "The Lost Tribe, Islamabad", rating: 4.4, reviews: 900, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/e5/c3/df/caption.jpg?w=1400&h=800&s=1" },
        { name: "The Carnivore", rating: 4.3, reviews: 800, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c1/cd/dd/welcome-to-the-carnivore.jpg?w=1100&h=700&s=1" },
        { name: "Tuscany Courtyard", rating: 4.6, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/e6/2a/90/tuscany-courtyard.jpg?w=300&h=-1&s=1" }
    ],
    Lahore: [
        { name: "Little Lahore", rating: 4.7, reviews: 1200, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/2b/73/56/interior.jpg?w=1400&h=800&s=1" },
        { name: "Andaaz Restaurant", rating: 4.5, reviews: 2500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/89/a8/3f/a-journey-for-the-food.jpg?w=1400&h=800&s=1" },
        { name: "Haveli Restaurant", rating: 4.8, reviews: 1100, price: "$$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/ba/01/06/entrance.jpg?w=1400&h=-1&s=1" },
        { name: "Monal Lahore", rating: 4.6, reviews: 1300, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f5/19/ab/photo0jpg.jpg?w=2000&h=-1&s=1" },
        { name: "Arcadian Cafe", rating: 4.5, reviews: 900, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/93/8f/47/arcadian-gulberg-new.jpg?w=1400&h=800&s=1" },
        { name: "Salt'n Pepper", rating: 4.6, reviews: 780, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/4d/7a/f1/ground-floor.jpg?w=800&h=-1&s=1" }
    ],
    Karachi: [
        { name: "Big Tree House", rating: 4.8, reviews: 2000, price: "$$$", image: "https://lh5.googleusercontent.com/p/AF1QipN4-T3cvMSl2daiJhn_HUbi2_YDNGmIUBIBwaaK=w650-h437-n-k-no" },
        { name: "LalQila Restaurant Karachi", rating: 4.7, reviews: 1300, price: "$$$$", image: "https://lh5.googleusercontent.com/p/AF1QipMHEbdMa4z1oaxZGiH7LfuNlGVGUAf1-kq24i1N=w650-h437-n-k-no" },
        { name: "Kolachi Restaurant", rating: 4.5, reviews: 1800, price: "$$$", image: "https://lh3.googleusercontent.com/p/AF1QipOoWj7VjjWBLB6WRT9y0ixBswygODdFTOAs3hPN=s1360-w1360-h1020" },
        { name: "The East End", rating: 4.6, reviews: 900, price: "$$$", image: "https://lh5.googleusercontent.com/p/AF1QipN2XwL__96A3GvyPqURPA7mQ-iD1EAqxQpYDYpi=w650-h437-n-k-no" },
        { name: "Cafe Aylanto", rating: 4.6, reviews: 650, price: "$$$$", image: "https://lh5.googleusercontent.com/p/AF1QipMC5YgqC7TtF-PcYlQajvq-wvGIv7S8H36DxLYy=w650-h437-n-k-no" },
        { name: "Okra Restaurant", rating: 4.4, reviews: 500, price: "$$", image: "https://lh5.googleusercontent.com/p/AF1QipPU5QWELaDdiXLxlB706HivsDhebHkEeEZRiNtT=w650-h437-n-k-no" }
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
        { name: "Saigon", rating: 4.5, reviews: 850, price: "$$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/33/7d/df/saigon.jpg?w=1400&h=-1&s=1" },
        { name: "New Quetta Restaurant & Cafeteria", rating: 4.6, reviews: 600, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/80/ce/19/new-quetta-restaurant.jpg?w=1400&h=800&s=1" },
        { name: "Quetta Grill", rating: 4.4, reviews: 550, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/b1/8f/0a/quetta-grill.jpg?w=1800&h=1000&s=1" },
        { name: "Quetta Club Limited", rating: 4.5, reviews: 500, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/20/d9/15/1f/quetta-club-limited-since.jpg?w=1400&h=-1&s=1" },
        { name: "Saigon Cafe & Restaurant", rating: 4.3, reviews: 400, price: "$$", image: "https://lh5.googleusercontent.com/p/AF1QipOs8Cn364KhjTm1rdIEnG9vOzRra4gZfaYl5Q4X=w650-h437-n-k-no" },
        { name: "Al Fajar Restauran", rating: 4.2, reviews: 350, price: "$$", image: "https://lh3.googleusercontent.com/p/AF1QipOxRmkVcWSEKLmV2l082ZN4ptLWze0EW1a4znp5=s1360-w1360-h1020" }
    ],
    Multan: [
        { name: "Multan Tandoori", rating: 4.7, reviews: 850, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/b1/52/bf/multan-interior.jpg?w=1800&h=1000&s=1" },
        { name: "Ramada Multan", rating: 4.6, reviews: 980, price: "$$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/aa/f9/ac/located-in-the-heart.jpg?w=1400&h=800&s=1" },
        { name: "Shahjahan Grill", rating: 4.5, reviews: 750, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4d/11/94/exterior-facade.jpg?w=1800&h=1000&s=1" },
        { name: "London Courtyard", rating: 4.6, reviews: 700, price: "$$", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/c2/0f/e3/photo1jpg.jpg?w=1800&h=1000&s=1" },
        { name: "Chinatown & Jade Café", rating: 4.5, reviews: 650, price: "$$$", image: "https://lh3.googleusercontent.com/p/AF1QipMZP88czi_TwdcLSGnL9hz3dE_Kvx41bM1u4Y7T=s1360-w1360-h1020" },
        { name: "Al Kaif Multan", rating: 4.3, reviews: 500, price: "$$", image: "https://lh5.googleusercontent.com/p/AF1QipPe7Cju6Mnjeo1I4pbkFjrqEG-JXBxbZ7h5rf-9=w650-h437-n-k-no" }
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
