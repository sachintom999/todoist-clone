const Label = require("../models/label")

const getAllLabels = async (req, res) => {
    const labels = await Label.find({
        // owner: "99", // Replace with the actual user ObjectId TODO
    }).sort({ createdAt: -1 })

    return res.status(200).json(labels)
}



const getTasksUnderLabel = async (req,res)=>{
    console.log("first")

    try {
    
        const {labelId} = req.body
        console.log('req.body', req.body)
        console.log('labelId', labelId)
        const label = await Label.findById(labelId).populate("tasks")
        console.log('label', label)
        // const tasks = await label.tasks
        return res.status(200).json(tasks)
        
    } catch (error) {
        console.error(' labelController  error at line 16 ::', error)
        return res.status(500).json(error)
    }

    
    
    
}
module.exports = { getAllLabels, getTasksUnderLabel }