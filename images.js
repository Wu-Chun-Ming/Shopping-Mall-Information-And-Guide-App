export const images = {
    'shop': {
        'bookAndStationary': {
            'popular': require('./images/bookAndStationary/popular.jpg'),
            'Smiggle': require('./images/bookAndStationary/smiggle.jpg'),
        },
        'entertainment': {
            'Loud Speaker': require('./images/entertainment/loudSpeaker.jpg'),
            'Manekineko': require('./images/entertainment/manekineko.jpg'),
        },
        'fashion': {
            'Adidas': require('./images/fashion/adidas.jpg'),
            'H&M': require('./images/fashion/HM.jpg'),
            'underArmour': require('./images/fashion/underArmour.jpg'),
            'uniQlo': require('./images/fashion/uniqlo.jpg'),
        },
        'food': {
            'damso korean BBQ restaurant': require('./images/food/damso.jpg'),
            'KFC': require('./images/food/kfc.jpg'),
            'Mixue Ice Cream and Tea': require('./images/food/mixue.jpg'),
            'Sushi King': require('./images/food/sushiKing.jpg'),
        },
        'gadget': {
            'HuaWei': require('./images/gadgets/Huawei.jpg'),
            'SamSung': require('./images/gadgets/samsung.jpg'),
        },
        'jewellery': {
            'Swarovski': require('./images/jewellery/swarovski.jpg'),
        },
        'lifestyle': {
            'Aeon': require('./images/lifestyle/aeon.jpg'),
            'Akemi': require('./images/lifestyle/akemi.jpg'),
            'Mr Diy': require('./images/lifestyle/mrdiy.jpg'),
        },
    },
    'event': {
        '1': require('./images/event/event1.jpg'),
        '2': require('./images/event/event2.jpg'),
    },
};

export const getShopImageSource = (shop_type, shop_name) => {
    return images['shop'][shop_type][shop_name] || require('./images/defaultImage.jpg'); // Fallback image
};

export const getEventImageSource = (eventId) => {
    return images['event'][eventId] || require('./images/defaultImage.jpg'); // Fallback image
}