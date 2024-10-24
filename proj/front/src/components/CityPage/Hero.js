import React from 'react';
import './Hero.css';

const cityData = {
    "Islamabad": {
        title: "Islamabad, Pakistan",
        description: "Serving as the capital of Pakistan since the Sixties, Islamabad was built according to a carefully organized plan, divided into sectors along a grid of clean, tree-lined streets. The city is sheltered by the Margalla Hills, the foothills of the Himalayas and the home of rare species of leopard, deer, birds, and even porcupines. Several hiking paths end at Daman-e-Koh, a picnic spot with a splendid view of the entire city, including the massive modernist Faisal Mosque and even the Rawal Dam."
    },
    "Lahore": {
        title: "Lahore, Pakistan",
        description: "Known as the cultural heart of Pakistan, Lahore is a city steeped in history and vibrant traditions. Home to the magnificent Badshahi Mosque, the historic Lahore Fort, and the bustling streets of the Walled City, Lahore offers a unique blend of Mughal architecture and modern development. The city is famous for its rich cuisine, historical gardens, and the annual World Performing Arts Festival."
    },
    "Karachi": {
        title: "Karachi, Pakistan",
        description: "Pakistan's largest city and economic hub, Karachi is a dynamic coastal metropolis offering a mix of modern and colonial architecture, bustling bazaars, and scenic beaches along the Arabian Sea. The city boasts attractions like Clifton Beach, Mohatta Palace, and the iconic Mazar-e-Quaid, while serving as the country's major port and commercial center."
    },
    "Murree": {
        title: "Murree, Pakistan",
        description: "A charming hill station nestled in the Galyat region, Murree serves as a popular retreat from the summer heat. Known for its colonial architecture, pine forests, and panoramic mountain views, this hill resort offers visitors a peaceful escape with attractions like Mall Road, Kashmir Point, and Pindi Point, especially beautiful during the snowy winter months."
    },
    "Peshawar": {
        title: "Peshawar, Pakistan",
        description: "One of the oldest living cities in Asia, Peshawar is a fascinating blend of ancient history and vibrant culture. The city's historic Qissa Khwani Bazaar, Mahabat Khan Mosque, and Bala Hisar Fort tell tales of its rich past. Known for its traditional hospitality and unique cuisine, Peshawar serves as a gateway to the Khyber Pass."
    },
    "Skardu": {
        title: "Skardu, Pakistan",
        description: "Situated in the heart of the Karakoram range, Skardu is a paradise for mountaineers and nature enthusiasts. The city offers breathtaking views of snow-capped peaks, crystal-clear lakes like Kachura, and the dramatic Deosai Plains. It serves as the main gateway to Pakistan's highest peaks, including K2 and the Baltoro Glacier."
    },
    "Hunza": {
        title: "Hunza Valley, Pakistan",
        description: "The legendary Hunza Valley is known for its stunning natural beauty, longevity of its inhabitants, and rich cultural heritage. Surrounded by snow-capped peaks including Rakaposhi and Ultar Sar, the valley features ancient watchtowers, the historic Baltit Fort, and spectacular views of the Passu Cones, making it a photographer's paradise."
    },
    "Quetta": {
        title: "Quetta, Pakistan",
        description: "The capital of Balochistan, Quetta is known as the 'Fruit Garden of Pakistan' due to its abundant orchards. Surrounded by mountains, the city offers a unique blend of Pakistani and Afghan culture. Notable attractions include Hanna Lake, Hazarganji Chiltan National Park, and the traditional Pashtun and Baloch markets."
    },
    "Multan": {
        title: "Multan, Pakistan",
        description: "Known as the 'City of Saints', Multan is one of Pakistan's oldest cities, famous for its Sufi shrines, blue pottery, and sweet mangoes. The city's landscape is dotted with historic monuments like the Tomb of Shah Rukn-e-Alam and the Multan Fort, while its bazaars offer traditional handicrafts and textiles."
    },
    "Faisalabad": {
        title: "Faisalabad, Pakistan",
        description: "Previously known as Lyallpur, Faisalabad is Pakistan's textile capital and third-largest city. The city is characterized by its unique clock tower and eight bazaars that spread out in a British colonial-era designed pattern. Known for its industrial heritage, textile markets, and educational institutions, Faisalabad combines commerce with culture."
    }
};

const Hero = ({ cityName = "Islamabad" }) => {
    const city = cityData[cityName] || cityData["Islamabad"];

    return (
        <section className="hero">
            <div className="hero-image">
                <h1 className="hero-title">{city.title}</h1>
            </div>
            <div className="hero-description">
                <p>{city.description}</p>
            </div>
        </section>
    );
};

export default Hero;