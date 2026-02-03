Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
	<div class="product">

        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="altText" />
<!--            <img :src="image" :alt="altText" />-->
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <h1>{{ product }}</h1>
            <p>{{ sale }}</p>
<!--            <p v-if="inStock">In Stock</p>-->
<!--            <p v-else>Out of Stock</p>-->
            <p v-if="inventory > 100">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0 ">Almost sold out!</p>
            <p v-else
               :disabled="!inStock"
               :class="{ disabledP: !inStock}">
                Out of Stock</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor}"
                 @mouseover="updateProduct(index)">
            </div>
            <div v-for=" size in sizes">
                <ul>
                    <li>{{ size }}</li>
                </ul>
            </div>
            <p>Shipping: {{ shipping }}</p>
<!--            <p>User is premium: {{ premium }}</p>-->
            <div class="cart">
                <p> Cart {{cart}}</p>
            </div>
            <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
                Add to cart
            </button>
            <button v-on:click="removeToCart">Remove</button>
        </div>
   </div>
 `,

    data() {
        return {
            product: "Socks",
            brand: "софти",
            description: " A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair of socks",
            url: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks.",
            inStock: false,
            inventory: 0,
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                }
            ],
            sizes: ['S', 'M', 'L'],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeToCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + 'соксы ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        sale() {
            if (this.onSale){
                return this.brand + ' ' + this.product + " yes итс а сасалеле!!!";
            }
            return this.brand + ' ' + this.product;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    },
})
