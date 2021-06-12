const express = require('express')
const router = express.Router()
const { Course } = require('../../models/courses')
const  checkValidity  = require('../../middlewares/validateCourse')

// get all courses
router.get('/' , async(req, res) => {

    let page = Number(req.query.page ? req.query.page: 1)
    let perPage = Number(req.query.perPage ? req.query.perPage: 10)

    let skipRecords = perPage * (page - 1)

    let courses = await Course.find().skip(skipRecords).limit(perPage)

    return res.send(courses)
})


// get single courses
router.get('/:id' , async(req, res) => {

    try{
        let course = await Course.findById(req.params.id)

        // if course not found
        if (!course){
            return res.status(400).send('Course with this ID not Found')
        }

        // if course found
        return res.send(course)

    }catch( err ){
        // if format of ID is not correct
        return res.status(400).send('Invalid ID')
    }
})

// update a course
router.put('/:id' , checkValidity , async(req, res) => {

    let course = await Course.findById(req.params.id)

    // updating
    course.name = req.body.name
    course.author = req.body.author
    course.price = req.body.price
    course.image = req.body.image

    // saving changes
    await course.save()

    return res.send(course)

})


// delete a course
router.delete('/:id' , async(req, res) => {

    let course = await Course.findByIdAndDelete(req.params.id)

    return res.send(course)

})

// add new course
router.post('/' , checkValidity , async(req, res) => {

    let course = new Course()

    // adding
    course.name = req.body.name
    course.author = req.body.author
    course.price = req.body.price
    course.image = req.body.image

    // saving course
    await course.save()

    return res.send(course)

})

module.exports = router