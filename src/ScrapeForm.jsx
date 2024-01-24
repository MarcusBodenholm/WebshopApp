import {useRef} from 'react'
import scrapeInfo, {scrapeHrefs} from './OperationScrapeInfo';
import { db } from './config/firebase';
import { addDoc, collection } from 'firebase/firestore';

//Scrape logg
//Kvinnor - jackor - done
//Kvinnor - skor - done
//Kvinnor - Jeans - done
//Kvinnor - väskor - done
//Kvinnor - Accessoarer - done
//Kvinnor - toppar - done
//Kvinnor - Blusar & Skjortor - done
//Kvinnor - Byxor - done
//Kvinnor - Smycken - done
//Kvinnor - Klänningar - done
//Kvinnor - Kjolar - done
//Kvinnor - koftor - done

//Herrar - Accessoarer - done
//Herrar - Byxor - done
//Herrar - Jackor - done
//Herrar - Jeans - done
//Herrar - Kostymer - done
//Herrar - Shorts - done
//Herrar - skjortor - done
//Herrar - Skor - done
//Herrar - Smycken - done
//Herrar - T-shirts - done
//Herrar - Tröjor - done
//Herrar - Väskor - done


const ScrapeForm = () => {
    const urlRef = useRef();
    const categoryRef = useRef();

    const categoryUrlRef = useRef();
    const sizes = ["s", "m", "l", "xl"];
    const productsCollectionRef = collection(db, "products")
    const addToDb = async(product) => {
        try {
            await addDoc(productsCollectionRef, {
                brand: product.brand,
                category: product.category,
                deliveryTime: product.deliveryTime,
                description: product.description,
                for: product.for,
                images: product.images, 
                price: product.price,
                sizes: sizes,
                title: product.title
    
            })    
        }
        catch (err) {
            console.error(err);
        }
        finally {
            console.log("done");
        }
    }
    const handleClick = async() => {
        const url = urlRef.current.value;
        const category = categoryRef.current.value;
        const data = await scrapeInfo(url, category);
        console.log(data);
        addToDb(data);
    }

    const handleCategoryClick = async() => {
        const hrefs = await scrapeHrefs(categoryUrlRef.current.value);
        console.log(hrefs);
        for (let i = 0; i < hrefs.length; i++) {
            setTimeout(() => console.log("wait over"), 1500);
            try {
                const data = await scrapeInfo(hrefs[i], categoryRef.current.value)
                console.log(data);
                await addToDb(data);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    return (
        <div style={{display:"flex", flexDirection:"column", width:"400px"}}>
            <h4>Scrape details</h4>
            <label htmlFor="url">Url till enskild sida</label>
            <input type="text" name="url" id="url" ref={urlRef} />
            {/* <label htmlFor="category">Kategori</label>
            <input type="text" name="category" id="category" ref={categoryRef} /> */}
            <button onClick={handleClick}>Scrape</button>

            <h4>Scrape category</h4>
            <label htmlFor="categoryurl">Url till kategori</label>
            <input type="text" name="categoryurl" id="categoryurl" ref={categoryUrlRef} />
            <label htmlFor="category">Kategori</label>
            <input type="text" name="category" id="category" ref={categoryRef} />
            <button onClick={handleCategoryClick}>Scrape Category</button>

        </div>
    )
}

export default ScrapeForm