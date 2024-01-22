
export const scrapeHrefs = async(url) => {
    const webpage = await fetch(url)
    .then(res => res.text())
    .then(html => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html")
        return doc;
    })
    const getHrefs = html => {
        const data = html.querySelectorAll(".c-fVIQI .c-dvHMYx.c-dvHMYx-ijVLVTy-css")
        //https://www.miinto.se/
        const hrefs = Array.from(data).slice(0, 12).map(anch => {
            return anch.href.replace("http://localhost:5173", "https://www.miinto.se")
        });
        return hrefs;
    }
    const hrefs = getHrefs(webpage);
    return hrefs

}

const scrapeInfo = async(url, inputCategory = "") => {
    const webpage = await fetch(url)
                    .then(res => res.text())
                    .then(html => {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(html, "text/html")
                        console.log(doc)
                        return doc;
                    })

    const getImgs = html => {
        const srcs = html.querySelectorAll('picture source');
        const filteredSrcs = Array.from(srcs).filter(src => src.type == "image/avif").map(src => src.srcset)
        // console.log(filteredSrcs)
        return filteredSrcs;
    }
    const getDescription = html => {
        const description = html.querySelector('.c-lkTJbH-iLuIvB-customInfo-true')
        if (!description) {
            return "";
        }
        // console.log(description.innerHTML);
        return description.innerHTML;
    }
    const getPrice = html => {
        const price = html.querySelector('.c-jMrfUZ.c-fuZznB');
        const scrubbedPrice = price.innerText.replace('.', '').replace(' SEK', '');
        // console.log(scrubbedPrice);
        return scrubbedPrice;
    }
    const getTitle = html => {
        const title = html.querySelector('.c-jMrfUZ.c-jLtGOH').innerText;
        // console.log(title);
        return title;
    }
    const getDeliverytime = html => {
        const deliveryTime = html.querySelector('.c-glLiWE').innerText;
        // console.log(deliveryTime);
        return deliveryTime;
    }
    const getBrand = html => {
        const brand = html.querySelector('.c-jMrfUZ.c-bADyqx').innerText;
        // console.log(brand);
        return brand;
    }
    const getFor = html => {
        const forWhom = html.querySelector('.c-gINCZk a:nth-child(3)').innerText
        return forWhom;
    }
    const description = getDescription(webpage);
    const price = getPrice(webpage);
    const title = getTitle(webpage);
    const deliveryTime = getDeliverytime(webpage);
    const images = getImgs(webpage);
    const brand = getBrand(webpage);
    const category = inputCategory;
    const forWhom = getFor(webpage);
    return {
        description: description,
        price: price,
        title: title,
        deliveryTime:deliveryTime,
        images: images,
        brand: brand,
        category:category,
        for: forWhom,
    }
}


export default scrapeInfo;