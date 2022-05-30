module.exports = function(app, db) {

    app.get('/api/test', function(req, res) {
        res.json({
            name: 'joe'
        });
    });

    app.get('api/garments/price/:price', async function(req, res) {
        try {
            const { price } = req.params;
            let garments = await db.many(`select * from garment where price <= $1`, [price]);
            console.log(garments.length);
            res.json({
                data: garments
            })
        } catch (error) {
            console.log(error);
        }
    })
    app.get('api/garments', async function(req, res) {

        const { gender, season } = req.query;
        let garments = [];
        // add some sql queries that filter on gender & season
        if (!gender && !season) {
            garments = await db.many(`select * from garment`)
        } else if (gender && season) {
            garments = await db.many(`select * from garment where gender=$1 and season=$2`, [gender, season])
        } else if (season) {
            garments = await db.many(`select * from garment where season=$1`, [season])
        } else if (gender) {
            garments = await db.many(`select * from garment where gender=$1`, [gender])
        }

        res.json({
            data: garments
        })
    });

    app.put('api/garment/:id', async function(req, res) {

        try {

            // use an update query...

            const { id } = req.params;

            // const garment = await db.oneOrNone(`select * from garment where id = $1`, [id]);
            const gender = req.body.gender
            if (id && gender) {
                await db.oneOrNone(`update garment set gender=$2 where  id= $1`, [id, gender])

            }
            // you could use code like this if you want to update on any column in the table
            // and allow users to only specify the fields to update

            // let params = { ...garment, ...req.body };
            // const { description, price, img, season, gender } = params;


            res.json({
                status: 'success',

            })
        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.get('api/garment/:id', async function(req, res) {

        try {
            const { id } = req.params;
            // get the garment from the database
            let garment = []
            garment = await db.oneOrNone(`select * from garment where id = $1`, [id]);


            res.json({
                status: 'success',
                data: garment
            });

        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });


    app.post('api/garment/', async function(req, res) {

        try {

            const { description, price, img, season, gender } = req.body;

            // insert a new garment in the database
            let garment = []
            await db.none(`insert into garment(description, img, season, gender, price) values ($1, $2, $3, $4, $5)`, [description, img, season, gender, price]);
            if (gender == 'Male') {
                garment = await db.many(`select * from garment where gender=$1`, [gender])
            } else if (gender == 'Female') {
                garment = await db.many(`select * from garment where gender=$1`, [gender])
            }
            res.json({
                status: 'success',
                data: garment
            });

        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.get('api/garments/grouped', async function(req, res) {
        let result = []
            // use group by query with order by asc on count(*)

        result = await db.many(`select count(*),gender from garment group by gender order by count(*) asc`);


        res.json({
            data: result
        })
    });


    app.delete('api/garments', async function(req, res) {

        try {
            const { gender } = req.query;
            // delete the garments with the specified gender


            res.json({
                status: 'success'
            })
        } catch (err) {
            // console.log(err);
            res.json({
                status: 'success',
                error: err.stack
            })
        }
    });


}