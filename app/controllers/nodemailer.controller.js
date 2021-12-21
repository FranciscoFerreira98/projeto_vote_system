const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.sapo.pt",
    auth: {
        user: 'votesystemipca@sapo.pt',
        pass: 'votesystemipca1'
    },
});



  

exports.sendEmail = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    const data = {
        to: req.body.to,
        title: req.body.title,
        name: req.body.name,
        md5: req.body.md5,
        pollId: req.body.pollId
    };

    const mailData = {
        from: 'votesystemipca@sapo.pt',
        to: data.to,
        subject: data.title,
        html: `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
        
        
        
        <div style="background-color:#f6f6f6;color:#000000">
            <center>
                <table width="620" style="max-width:620px;border-collapse:collapse;margin:0 auto 0 auto" border="0"
                    cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td>
                                <table border="0" width="580" cellpadding="0" cellspacing="0"
                                    style="max-width:580px;padding-left:20px;padding-right:20px">
                                    <tbody>
                                        <tr style="height:50px"></tr>
                                        <tr>
                                            <td align="center" style="line-height:0">
                                                <img src="https://i.ibb.co/1LMGy5Y/top-Email-Prancheta-1.png" class="CToWUd a6T"
                                                    tabindex="0">
                                                <div class="a6S" dir="ltr" style="opacity: 0.01; left: 716.5px; top: 268px;">
                                                    <div id=":193" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button"
                                                        tabindex="0" aria-label="Transferir anexo " data-tooltip-class="a1V"
                                                        data-tooltip="Descarregue">
                                                        <div class="akn">
                                                            <div class="aSK J-J5-Ji aYr"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
        
                                        <tr style="background:#ffffff">
                                            <td border="0"
                                                style="padding-left:20px;padding-right:20px;padding-top:29.8px;font-size:22px;color:#000000;letter-spacing:0;line-height:37px;font-family: 'Poppins', sans-serif;">
                                                <p>
                                                    <span style="display:block" dir="ltr">Olá, ${data.name},<br><br>Podes votar
                                                        ao pressionar no botão a baixo, poderás obeservar o resultado <a href="http://localhost:8081/result/${data.pollId}">aqui!</a>
                                                    </span>
                                                </p>
                                            </td>
                                        </tr>
                                        
                                        <tr style="background:#ffffff">
                                            <td align="center" style="font-family: 'Poppins', sans-serif;">
                                                <br>
                                                <br>
                                                <a href="http://localhost:8081/vote/${data.md5}" style="box-sizing:border-box;display:inline-block;font-family:'Poppins',sans-serif;text-decoration:none;text-align:center;color:#ffffff;background-color:#20d489;border-radius:10px;width:auto;max-width:100%;word-break:break-word;word-wrap:break-word;border-top-color:#b93cc0;border-top-style:solid;border-top-width:0px;border-left-color:#b93cc0;border-left-style:solid;border-left-width:0px;border-right-color:#b93cc0;border-right-style:solid;border-right-width:0px;border-bottom-color:#b93cc0;border-bottom-style:solid;border-bottom-width:0px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://localhost:8081/vote/${data.md5}&amp;source=gmail&amp;ust=1635334522539000&amp;usg=AFQjCNEuXSHyT9m5W-hMup6Xwn9FGhmZBg">
                                                    <span style="display:block;padding:15px 25px;line-height:120%"><strong><span style="font-size:24px;line-height:28.8px">VOTA AGORA</span></strong><br></span>
                                                  </a>
                                                  
                                            </td>
                                        </tr>
                                        <tr style="background:#ffffff">
                                            <td border="0"
                                                style="padding-left:20px;padding-right:20px;padding-top:29.8px;font-size:22px;color:#000000;letter-spacing:0;line-height:37px;font-family: 'Poppins', sans-serif;">
                                                <p>
                                                    <span style="display:block" dir="ltr">
                                                        <br>Obrigado,<br>Vote.
                                                        <span class="il">Made by Francisco Ferreira</span><br></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <img src="https://i.ibb.co/hC0SvWd/Bottom-Email-Prancheta-1.png" class="CToWUd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center"
                                                style="margin-top:0;margin-bottom:0;color:#262626;font-size:17px;padding-top:30px;padding-bottom:70px;letter-spacing:0;line-height:35px;font-family: 'Poppins', sans-serif;">
                                                <p>
                                                    <span style="display:block" dir="ltr">© <span class="il">Francisco
                                                            Ferreira.</span>
                                                         2021 &nbsp;&nbsp;|&nbsp;&nbsp; <a href="http://localhost:8081/terms"
                                                            style="text-decoration:none;color:#0eadff" target="_blank"
                                                            data-saferedirecturl="https://www.google.com/url?q=https://snap.com/terms&amp;source=gmail&amp;ust=1635334533734000&amp;usg=AFQjCNGRkBdcrVqUtQR8NsfEqx_yyjz-1w">Condições
                                                            de Serviço</a></span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        
            <img src="https://ci3.googleusercontent.com/proxy/7WIOiLv-oC1KK07PpQ5VsQiU-wf0ff3ueuECXFmpXy77kLMuRzyWD2q97rPbC1fn_qRKco9UfSPHuCLOhu8gxTnFqbzwQerHYCif8E3NHEQcGgZI-1pbjHSslML6HnVsw51Wr8G94J3A_x1GHth0zWMJ69Gr4_91qitp4KqADVFIrs99lmh7Odcmeb5Ei6u1nG4tPZh2unqXFt7yq4QfehzJEp8_IJYbV8SpTlSiol2lPbJvBfdt0kTP5VdS4Ll5bbD0L-670uvqoFaLjuw4LOqWr4Tr-LsH2w_rgdxLFQMZwpeEfFBmTx5OEeQ29gNqEL9tQ19WPRoPyK0DGK2NfR3_g6RplMqK5CIofMGC3IWFguSYQI2k6sazFlTuJa3RGxWVPEmrZByG81_gd5FbSSMlz7KfKgxCLTInr6PRIyutwUClkViZrMdsn5W8WkcBqMly_9wAp6nqFfgET9HG9IVNT5QMyEe4vgpiF_cdQblsbTMdTKs8em4zxHoICrKhvBv6dOOjvdbNJwcMMRikj1zj7bl3xkSM9x2gShindC2wFyQ37JGWNpt2BVRJkkrEAdqcA4p5l79BZLjPdm_BZkfVXPEmWK-I3-fdwTZr7gZHk9jvQ7Vqtf87FZm7f00BeDKHHHtpSdHGTX8KwrS2e3a6M1MTYfy02RWQc_PQ8CbR5CCzJxB5flxkKy1NcE6oqgwkKHj35Q=s0-d-e1-ft#https://u5086036.ct.sendgrid.net/wf/open?upn=Wy3vPGL3E8forwHZaEwsJBDyhN-2BoY7gZP-2B6qBItjkfAC-2FIOJRYTa5tl7VjHWTQ2fPOkFduU6wVAciBf3GwNXy8N8QHBEmyg-2BMAL25tSpGRwaWJL-2B-2B9sbiGFieQVHFjMr3N5I2pJ6Co8-2F8VySw3kTmbYPNznzDLISUgwrhd4ZvVuD61BtoMPWe-2FMPTzmTfo-2Fay-2BARGgjx-2BJjQ-2Bt-2F2EL3r2teRmvH-2F-2F3L75eA4VHkQaJMbiqQvnzn1K2Xj-2BERyJGj3iwlQh5X-2FqtxgxqHajGCwc8p-2FwaVqCUiXD7LDWs2TEcnIjtIVoUQOuZ8BDGIrgQsQGyB67H8WdXdCQy6TY1ESzeU-2F9EIOUqMskuz1RV1qQ8tdTqPStgimlEHQDu3ztuZe5rgOLEgajGeGudjjATDPJqxykFkP9RYlCR-2BvC7OjEiE-3D"
                alt="" width="1" height="1" border="0"
                style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important"
                class="CToWUd">
            <div class="yj6qo"></div>
            <div class="adL">
            </div>
        </div>
        <div class="adL">
        
        
        </div>
        </div>
        `,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({
            message: "Mail send",
            message_id: info.messageId
        });
    });
};