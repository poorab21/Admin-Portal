import clientPromise from "../../../lib/mongo";
import Mailgen from "mailgen";
import nodemailer from 'nodemailer';

export default async function OTP(req,res){
    if(req.method === 'POST'){
        const { email } = req.body
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const num3 = Math.floor(Math.random() * 10);
        const num4 = Math.floor(Math.random() * 10);

        const transporter = nodemailer.createTransport({
            service : 'gmail' ,
            auth : {
                user : 'cs191092@dsu.edu.pk' ,
                pass : 'bhzxubtegoiijnpw'
            }
        })

        const mailGenerator = new Mailgen({
            theme : 'default' ,
            product : {
                name : "Maid In" ,
                link : "https://mailgen.js" ,
                copyright : 'Copyright © 2023 Maid-In. All rights reserved.'
            }
        })

        const mail = mailGenerator.generate({
            body : {
                title : 'Maid In Verification' ,
                signature : 'Yours Truly' ,
                intro : 'Please specify the following Code to Maid In to have your password reset' ,
                table : {
                    data : [
                        {
                            D1 : num1 ,
                            D2 : num2 ,
                            D3 : num3 ,
                            D4 : num4 ,
                        }
                    ]
                },
                outro : 'If a problem arises, Please send Grievance of it to Maid In and we will try our best to resolve it ASAP'
            }
        })
        
        try{
            await transporter.sendMail({
                from : 'Maid In' ,
                to : email ,
                subject : 'Maid In OTP Verification' ,
                html : mail
            })
            res.json({
                success : true ,
                OTP : {
                    num1 : num1 ,
                    num2 : num2 , 
                    num3 : num3 ,
                    num4 : num4
                } 
            })
        }
        catch(err){
            res.json({
                success : false ,
                error : err
            })
        }
    }
}