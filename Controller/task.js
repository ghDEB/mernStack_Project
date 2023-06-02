import { TASK } from '../model/task.js';
import bcrypt from "bcrypt";
import { sendCookie } from '../utils/features.js';
import errorHandler from '../middlewares/error.js';

export const newTask = async (req,res,next)=>
{
    try 
    {
        const {title,description}= req.body;
        await TASK.create({
            title,
            description,
            user:req.user
        })

        res.status(201).json({
            success:true,
            message:"Task added successfully",
        })
    } 
    catch (error) 
    {
        next(error)
    }
    
}

export const getMyTask = async (req,res,next)=>
{
    try 
    {
        const userid = req.user._id;
        const tasks = await TASK.find({user:userid});
        res.status(200).json({
        success:true,
        tasks
        })
    } 
    catch (error) 
    {
        next(error)
    }
}

export const updateTask = async (req,res,next)=>
{
    try 
    {
        const {id} = req.params;
        const task = await TASK.findById(id); 
        if(!task)
        {
            return next(new errorHandler("Invalid ID"));
        } 
        else
        {
            task.isCompleted = !task.isCompleted;
            await task.save();
            res.status(200).json({
            success:true,
            message:"Task Updated Successfully",
            tasks
        })
        }
    } catch (error) 
    {
        next(error)
    }
}

export const deleteTask = async (req,res,next)=>
{
   try 
   {
    const {id} = req.params;
    const task = await TASK.findById(id);
    if(!task)
    {
        return next(new errorHandler("Task Not Found", 404));
    } 
    else
    {
        await task.deleteOne();
        res.status(200).json({
        success:true,
    })
    }
    
   } 
   catch (error) 
   {
    next(error);
   }

}
