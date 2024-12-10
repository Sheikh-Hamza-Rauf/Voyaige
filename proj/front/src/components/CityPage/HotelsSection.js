import React from 'react';
import './HotelsSection.css';

const cityHotels = {
    Islamabad: [
        { name: "Hotel Hillview Islamabad", rating: 4.5, reviews: 263, price: 82, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412677596.jpg?k=9b84e9fc35fa5170baea3c5046bcbfb39f0d2f9fc9ee241639fba958f2a2fdbb&o=" },
        { name: "The 108 Hotel", rating: 5, reviews: 153, price: null, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/321508463.jpg?k=b4d405dada3968a746c8988364236c165cf0d8985ede33aa304abf06f793ab6a&o=" },
        { name: "Ramada by Wyndham Islamabad", rating: 4.5, reviews: 573, price: 130, image: "https://pix8.agoda.net/hotelImages/5780947/0/67639b9d03cf46c04c9a2a2eb552e4bf.jpg?ca=7&ce=1&s=1024x" },
        { name: "Islamabad Serena Hotel", rating: 4.5, reviews: 1030, price: 270, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/183065428.jpg?k=23123f8db7249214d0796fdd0b446afa52e6ba89b5e9a5de1bb6899b00b876ff&o=" },
        { name: "Islamabad Marriott Hotel", rating: 4, reviews: 590, price: 181, image: "https://images.trvl-media.com/lodging/1000000/20000/11000/10913/w3996h2667x0y0-884aefb6.jpg?impolicy=resizecrop&rw=1200&ra=fit" },
        { name: "Best Western Premier Islamabad", rating: 4, reviews: 59, price: null, image: "https://pix8.agoda.net/hotelImages/30308743/0/cd019f9c97c6a38d4267a3ac968270d4.jpg?ca=26&ce=0&s=1024x" }
    ],
    Lahore: [
        { name: "Pearl Continental Lahore", rating: 4.7, reviews: 1200, price: 200, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/278504590.jpg?k=2d6676b5981e1fafc018b5d092375e37656a136a18b08e07acebf39a6b395ae1&o=" },
        { name: "Nishat Hotel Lahore", rating: 4.5, reviews: 850, price: 150, image: "https://admin.lbnhotels.com/storage/upload/hotels/1702898833.jpg" },
        { name: "Avari Lahore", rating: 4.4, reviews: 780, price: 130, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/277887727.jpg?k=218aa708109b7bff6274e168bbfe07726ae0b5922ed37280e2b5b1c1e86a892b&o=" },
        { name: " Premier Hotel Gulberg", rating: 4.3, reviews: 450, price: 80, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/405583062.jpg?k=4442f4274c341e65a37d39bd1798c778f6e4ff6c8c47494144f73e4fbc61a5b6&o=" },
        { name: "Defence Raya Golf & Country Club", rating: 4.2, reviews: 320, price: 90, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/146007767.jpg?k=a01836f9cf5d7fedc050648f325bf03b8fdd7ac771e76316f2a2937cbcf5149e&o=" },
        { name: "Four Points", rating: 4.4, reviews: 290, price: 110, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/463614415.jpg?k=f262e1fba3f14deab329607d022035a1bfe2bb7735fb3a98f6a8b0953b52973e&o=" }
    ],
    Karachi: [
        { name: "Pearl Continental Karachi", rating: 4.6, reviews: 980, price: 190, image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/280190518.jpg?k=db3eb9d9fbda8f9b02f7a345f935f5efc2fd492722862b0684804a275b01f78f&o=&hp=1" },
        { name: "Ramada Plaza by Wyndham Karachi Airport Hotel", rating: 4.5, reviews: 760, price: 170, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/241146539.jpg?k=a48a1f69f406a71ea2edb9a2cad104526fd8ba4cc0d4d1789640e8db0aace5ef&o=" },
        { name: "Marriott Karachi", rating: 4.4, reviews: 850, price: 160, image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/577204584.jpg?k=1b0ddc4b53ee6d829c3a73595a8e5cba9e9cb677c935fb30e0be7a534fb92002&o=&hp=1" },
        { name: "Mehran Hotel Karachi", rating: 4.3, reviews: 670, price: 140, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/564432084.jpg?k=29de6251d2f7c4cc50e9c1665b86d105363141de8cadf7c86915018f46894f07&o=" },
        { name: "Mövenpick Hotel Karachi", rating: 4.2, reviews: 340, price: 80, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/376266891.jpg?k=ee7ece24f0d0ce98dee9fa3766c00ef761b2e303df8c3b0de7809a1682e048b6&o=" },
        { name: "Beach Luxury Hotel", rating: 4.1, reviews: 420, price: 100, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/145246938.jpg?k=c88a9c0183f5e9d43e197e88866a365aecd8a9005217192cee2bced983959eda&o=" }
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
        { name: "Ramada Multan", rating: 4.6, reviews: 700, price: 140, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/297286146.jpg?k=cde21033a620e90d57a0b6969d2cef6e3d3baa18d66bc06c855acc8c3f2a9177&o=" },
        { name: "Rumanza by Pearl Continental", rating: 4.5, reviews: 500, price: 130, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/549284700.jpg?k=82e3ad653d1668f14b886756047427609b98c6cd6d3d95b7d1edbbd0e1d52fcf&o=" },
        { name: "Avari Boutique Multan", rating: 4.3, reviews: 300, price: 90, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/116677942.jpg?k=b8f268a61c808b757dcd770b0756647078ade7126120489dbe2284ba10b34a64&o=" },
        { name: "Hotel Avalon Suites", rating: 4.4, reviews: 320, price: 110, image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/494489289.jpg?k=3ab048220236d11716cc0fbe0898ec36e5b73f43a7368a8e409a90940ab7fc71&o=&hp=1" },
        { name: "Hotel Grace Inn Multan", rating: 4.2, reviews: 280, price: 70, image: "https://cf.bstatic.com/xdata/images/hotel/max500/588291812.jpg?k=1c9c8f358852366331d1b6b13ddb6eda99b33c3823657cef45d9089fcb131365&o=" },
        { name: "Multan Continental Hotel", rating: 4.1, reviews: 250, price: 100, image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/332329787.jpg?k=cdf523a344a819b63853262c079d6922f69f2192396ad759e2bf2b8ffe365fbd&o=" }
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
