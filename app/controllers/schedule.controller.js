const db = require("../models");
const Schedule = db.schedule;
const schedule = require('node-schedule');

schedule.scheduleJob('* * * * * *', function () {

    //Procurar todos os schedules que faltam
    Schedule.findAll({ where: { pending: true } })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log('Proximo schedule - Verificar segunda ' + data[i].dataValues.when);
                //Fim da votação
                const s = schedule.scheduleJob(data[i].dataValues.when, function () {
                    
                    const schedule = {
                        pending: false
                    }
                    Schedule.update(schedule, {
                        where: { id: data[i].dataValues.id }
                    })
                        .then(num => {
                            if (num == 1) {
                                console.log("Updated");
                            } else {
                                console.log("Not Updated");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
             
                    //Verificar se é necessario segunda volta

                    //Criar segunda volta



                    s.cancel();

                    //Update schedule para não voltar a acontecer
                  
                });
            }
        })
        .catch(err => {
            console.log(err);
        });


});