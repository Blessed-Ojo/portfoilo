"use server";
import {Resend} from "resend";

const resend = new Resend (process.env.RESEND_API_KEY);

export async function sendEmail( 
     formData:FormData
): Promise<{success:boolean,
     message:string}> {
   const name = formData.get("name") as string;
   const email = formData.get("email") as string;
   const subject = formData.get("subject") as string;
   const message = formData.get("message")as string;
     // Add some debugging
   
   if (!name || !subject ||!email||!message){
     return{success:false, message:"All field are required"};
   }
   try {
     await resend.emails.send({
          from:"Contact Form <onboarding@resend.dev>",
          to:["ojoblessed533@gmail.com"],
          subject:subject || "New Contact Form Submission",
          replyTo:email,
          html:`<h1>New Contact Form Submission</h1>
          <p><b>Name:</b>${name}</p>
          <p><b>Email:</b>${email}</p>
          <p><b>Subject:</b>${subject}</p>
          <p><b>Message:</b></b>${message.replace(/\n/g,"<br/>")}</p>

          `,
     });
  
     return{
           success:true,
           message:"Message sent! I'll get back to you soon.",
     }
   } catch (error) {
      console.error("Resend Error:", error);
      return {
               success:false,
               message:"Failed to send message. Please try again later.",
      }
   }
}