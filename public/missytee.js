document.addEventListener('alpine:init', () => {
    Alpine.data('clothing', () => ({
        init() {
            this.filterData(),
                this.garmentsDisplay(),
                this.filterRange(),
                this.deleteGaments(),
                this.garmentsSnackbar()
                // this.addGarmentData()
        },
        garments: [],
        genderFilter: '',
        seasonFilter: '',
        maxPrice: 0.00,
        addGarment: false,
        // id: '',
        addClothing: {
            description: '',
            img: '',
            price: 0,
            gender: '',
            season: '',
        },


        garmentsDisplay() {
            try {

                fetch(`/api/garments`)
                    .then(r => r.json())
                    .then(garmentsData => this.garments = garmentsData.data)
            } catch (error) {

            }
        },
        filterData() {
            try {
                // console.log(this.genderFilter, this.seasonFilter);
                fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
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
        addGarmentData() {
            try {
                console.log(this.addClothing);
                if (this.addClothing.description == "" || this.addClothing.img == "" || this.addClothing.price == 0 ||
                    this.addClothing.gender == "" || this.addClothing.season == "") {
                    alert('hello world')


                } else {
                    axios.post(`/api/garment`, this.addClothing)
                        .then(() => this.garmentsDisplay())
                        .then(console.log(addClothing))
                }

            } catch (error) {

            }
        },
        deleteGaments() {
            try {
                // console.log(this.id);
                axios.delete(`/api/garments/:id`)
                    .then(() => this.garmentsDisplay(this.id))
                    // .then(console.log(this.addClothing))
            } catch (error) {

            }
        },
        garmentsSnackbar() {
            fetch('/api/garments')
                .then(r => r.json())
                .then(garmentsData => this.garments = garmentsData.data),
                console.log('checking garments' + JSON.stringify(this.addClothing.description))
        }

    }))

})