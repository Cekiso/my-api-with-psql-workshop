document.addEventListener('alpine:init', () => {
    Alpine.data('clothing', () => ({
        init() {
            this.filterData(),
                this.garments(),
                this.filterRange(),
                this.addClothing()
        },
        garments: [],
        genderFilter: '',
        seasonFilter: '',
        maxPrice: 0.00,
        addGarment: [],

        garments() {
            try {
                fetch('https://my-api-with-psql-workshop.com/api/garments')
                    .then(r => r.json())
                    .then(garmentsData => this.garments = garmentsData.data)
            } catch (error) {

            }
        },
        filterData() {
            try {
                // console.log(this.genderFilter, this.seasonFilter);
                fetch(`https://my-api-with-psql-workshop.com/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
                    .then(r => r.json())
                    .then(garmentsData => this.garments = garmentsData.data)
            } catch (error) {

            }


        },
        filterRange() {
            try {
                // console.log(this.price);
                fetch(`/api/garments/price/${this.maxPrice}`)
                    .then(r => r.json())
                    .then(garmentsData => this.garments = garmentsData.data)
            } catch (error) {

            }
        },
        addClothing() {
            try {
                console.log(this.addGarment);
                fetch(`/api/garment/${this.addGarment}`)
                    .then(r => r.json())
                    .then(garmentsData => this.garments = garmentsData.data)


            } catch (error) {

            }
        },
        // trigger: {
        //     ['x-ref']: 'trigger',
        //     ['@click']() {
        //         this.open = true
        //     },
        // },
        // addGarments: {
        //     ['x-show']() {
        //         return this.open
        //     },
        //     ['@click.outside']() {
        //         this.open = false
        //     },
        // }
    }))

})