const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async(req,res=response) =>{
     

   const events = await Event.find()
   .populate('user','name');


   res.json({ok: true, events })
};

const postEvent = async(req,res=response) =>{

 //Verify Event
    console.log(req.body);  

    const event = new Event(req.body);
  
    try {

    event.user = req.uid;
      
   const eventSaved =   await  event.save();

   res.json({ok: true, event : eventSaved});

    } catch (error) {
       console.log(error);
       res.json({ok: false, message:'Admin'});
    }

  
};


const UpdatetEvent = async(req, res=response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

   

     try {
         
     const event = await  Event.findById(eventId);
  
    if(!event){ return res.status(404).json({ok: false, msg:'Result not Found'})};

    if(event.user.toString() !== uid){
        return res.status(401).json({ok: false, msg:'Your user not have permission for realize this action '})
    }

    const  eventData = {...req.body,user:uid};

    const updateEvent = await Event.findByIdAndUpdate(eventId,eventData,{new: true});

    res.status(400).json({ok: true, event : updateEvent});

     } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, message:'Admin'});
     }

    
};


const DeleteEvent = async(req, res=response) =>{

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
         
        const event = await  Event.findById(eventId);
     
       if(!event){ return res.status(404).json({ok: false, msg:'Result not Found'})};
   
       if(event.user.toString() !== uid){
           return res.status(401).json({ok: false, msg:'Your user not have permission for realize this action '})
       }
   
       await Event.findByIdAndDelete(eventId);
   
       res.json({ok: true, message:'DeleteEvent'});
       
        } catch (error) {
           console.log(error);
           res.status(500).json({ok: false, message:'Admin'});
        }
   
};

module.exports = {getEvents,postEvent,UpdatetEvent,DeleteEvent};