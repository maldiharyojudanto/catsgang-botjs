import chalk from "chalk";
import fetch, { fileFromSync }from "node-fetch";
import figlet from "figlet";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// async func to create user
const createUser = async (query) => {
    const url = `https://api.catshouse.club/user/create?${process.env.REF_CODE}`

    const payload = JSON.stringify({})

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            console.error(`Error to create user, ${e}`)
        }
    }
}

// async func to get user
const getUser = async (query) => {
    const url = "https://api.catshouse.club/user"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: headers
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            if (e == "Error: 404 Not Found") {
                await createUser(query)
                await new Promise(resolve => setTimeout(resolve, 3000))
            } else {
                console.error(`Error to get user, ${e}`)
            }
        }
    }
}

// async function to get task
const getTask = async (query, taskid) => {
    const url = `https://api.catshouse.club/tasks/user?group=${taskid}` // cats, bitget, okx

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: headers
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            console.error(`Error to get task, ${e}`)
        }
    }
}

// async function to startComplete
const start = async (query, taskid, method) => {
    const url = `https://api.catshouse.club/tasks/${taskid}/${method}` // complete & check

    const payload = JSON.stringify({})
    
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            if (e == "Error: 403 Forbidden") {
                break
            } else {
                console.error(`Error to start id ${taskid}, ${e}`)
            }
        }
    }
}

// async func to answer youtube
const submitYoutube = async (query, taskid, answer) => {
    const url = `https://api.catshouse.club/tasks/${taskid}/complete?answer=${answer}`

    const payload = JSON.stringify({})
    
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129", "Microsoft Edge WebView2";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: payload
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            console.error(`Error to submit youtube, ${e}`)
        }
    }
}

// async func to get avatar 
const avatar = async (query) => {
    const url = "https://api.catshouse.club/user/avatar"

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'content-type': 'application/json',
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'get',
                headers: headers,
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            console.error(`Error to get avatar, ${e}`)
        }
    }
}

// async function to upgrade
const upgrade = async (query) => {
    const url = "https://api.catshouse.club/user/avatar/upgrade"

    let data = new FormData()
    data.append('photo', fileFromSync('./photo/photo.jpg'))

    const headers = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `tma ${query}`,
        'origin': 'https://cats-frontend.tgapps.store',
        'priority': 'u=1, i',
        'referer': 'https://cats-frontend.tgapps.store/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128", "Microsoft Edge WebView2";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
    }

    while(true) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: headers,
                body: data
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            return await response.json()
        } catch (e) {
            if (e == "Error: 500 Internal Server Error" || e == "Error: 502 Bad Gateway") {
                break
            } else {
                console.error(`Error to upgrade, ${e}`)
            }
        }
    }
}

// async func to countdown
const timeCount = async (finish, waktu) => {
    for (let i = waktu; i >= 0; i--) {
        // inisiasi menit dan second
        let minutes = Math.floor(waktu/60)
        let seconds = waktu % 60;

        // jika menit dan second < 2 digit
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // BOOMM tampilkan ******
        process.stdout.write(`Execution time : ${chalk.yellow(finish.toFixed(2))} seconds | Refresh after : ${chalk.yellow(`${minutes}:${seconds}`)}`);
        
        // increament - 1
        waktu = waktu-1;

        // blocking delay untuk satu detik
        await new Promise(resolve => setTimeout(resolve, 1000))

        // clear last console log
        if (waktu >= 0) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0); 
        }
    }
}

// async func to sendmessage to telegram
const sendMessage = async (total) => {
    const telegram_token = String(process.env.TELEGRAM_TOKEN)
    const telegram_chatid = String(process.env.TELEGRAM_CHATID)
    const message = `Total cats : ${total}`
    
    if (telegram_token != "" && telegram_chatid != "") {
        const url = `https://api.telegram.org/bot${telegram_token}/sendMessage?chat_id=${telegram_chatid}&text=${message}`

        while (true) {
            try {
                const response = await fetch(url);

                if (response.status == 200) {
                    // console.log(response.data)
                    return await response.json()
                }
            } catch (err) {
                console.error(`Error to sendMessage, ${err}`)
                continue
            }
        }
    } else {
        return
    }
}

(async () => {
    // const query = ""
    
    // clear screen
    console.clear()

    try {
        // open tokens.txt
        const data = fs.readFileSync('query.txt', 'utf-8')
        const querys = data.split('\n')

        while(true) {
            console.log(figlet.textSync('catsgang botjs', {font: "Ogre"}), '\n')
            console.log("Auto claim task :", process.env.AUTO_TASKS == "true" ? chalk.green('On') : "Off")
            console.log("Auto upgrade avatar :", process.env.AUTO_UPGRADE == "true" ? chalk.green('On') : "Off")
            console.log("")
            let starts = Date.now()/1000

            // open tokens.txt
            const data = fs.readFileSync('query.txt', 'utf-8')
            const querys = data.split('\n')

            // run all ***GATHER BOOMMM!!!!!
            const runall = await Promise.all(querys.map(async (query) => {
                if (query != "") {
                    // user
                    const user = await getUser(query)
                    const userid = user.id
                    const balance = user.totalRewards

                    // cats task/main task
                    const task_cats = await getTask(query, 'cats')
                    let cats_completed = 0
                    for (const i of task_cats.tasks) {
                        const id = i.id
                        const type = i.type
                        const completed = i.completed
                        if (type == 'OPEN_LINK' && completed == false) {
                            await start(query, id, 'complete')
                        } else if (type == 'SUBSCRIBE_TO_CHANNEL' && completed == false) {
                            await start(query, id, 'check')
                        }
                    }
                    for (const i of task_cats.tasks) {
                        if (i.completed == true) {
                            cats_completed = cats_completed+1
                        }
                    }
                    const answer = [
                        {"id": 141, "answer": "dildo"},
                        {"id": 146, "answer": "dip"},
                        {"id": 148, "answer": "AIRNODE"},
                        {"id": 149, "answer": "WEI"},
                        {"id": 153, "answer": "ABSTRACT"},
                        {"id": 154, "answer": "AUCTION"},
                        {"id": 155, "answer": "AUDIT"},
                        {"id": 158, "answer": "BAG"},
                        {"id": 159, "answer": "BAG"},
                        {"id": 160, "answer": "ALTCOIN"},
                        {"id": 161, "answer": "BAKING"},
                        {"id": 162, "answer": "ALPHA"},
                        {"id": 163, "answer": "BAKERS"}
                    ]

                    for (const i of answer) {
                        await submitYoutube(query, i.id, i.answer)
                    }
                    
                    // bitget task
                    const bitget_task = await getTask(query, 'bitget')
                    let bitget_completed = 0
                    for (const i of bitget_task.tasks) {
                        const id = i.id
                        const type = i.type
                        const completed = i.completed
                        if (type == 'OPEN_LINK' && completed == false) {
                            await start(query, id, 'complete')
                        } else if (type == 'SUBSCRIBE_TO_CHANNEL' && completed == false) {
                            await start(query, id, 'check')
                        }
                    }
                    for (const i of bitget_task.tasks) {
                        if (i.completed == true) {
                            bitget_completed = bitget_completed+1
                        }
                    }

                    // okx task
                    const okx_task = await getTask(query, 'okx')
                    let okx_completed = 0
                    for (const i of okx_task.tasks) {
                        const id = i.id
                        const type = i.type
                        const completed = i.completed
                        if (type == 'OPEN_LINK' && completed == false) {
                            await start(query, id, 'complete')
                        } else if (type == 'SUBSCRIBE_TO_CHANNEL' && completed == false) {
                            await start(query, id, 'check')
                        }
                    }
                    for (const i of okx_task.tasks) {
                        if (i.completed == true) {
                            okx_completed = okx_completed+1
                        }
                    }

                     // kukoin task
                     const kukoin_task = await getTask(query, 'kukoin')
                     let kukoin_completed = 0
                     for (const i of kukoin_task.tasks) {
                         const id = i.id
                         const type = i.type
                         const completed = i.completed
                         if (type == 'OPEN_LINK' && completed == false) {
                             await start(query, id, 'complete')
                         } else if (type == 'SUBSCRIBE_TO_CHANNEL' && completed == false) {
                             await start(query, id, 'check')
                         }
                     }
                     for (const i of kukoin_task.tasks) {
                         if (i.completed == true) {
                            kukoin_completed = kukoin_completed+1
                         }
                     }

                    // upgrade
                    await upgrade(query) //.then(res => console.log(res))

                    console.log(`[${userid}] | Balance : ${balance > 0 ? chalk.green(balance) : balance} | Task completed : ${cats_completed > 0 ? chalk.yellow(cats_completed) : cats_completed} | Bitget completed : ${bitget_completed ? chalk.yellow(bitget_completed) : bitget_completed} | OKX completed : ${okx_completed ? chalk.yellow(okx_completed) : okx_completed} | Kucoin completed : ${kukoin_completed ? chalk.yellow(kukoin_completed) : kukoin_completed} `)
                    
                    return Math.trunc(balance)
                }
            }))

            let totalallacc = 0
            for (let i=0; i < runall.length; i++) {
                if (runall[i] != undefined) {
                    totalallacc = totalallacc + runall[i]
                }
            }

            // delay before next running
            console.log('')
            console.log('Total balance :', chalk.green(totalallacc.toLocaleString('en-US')))

            let finish = (Date.now()/1000)-starts

            // printed and blocking
            await timeCount(finish, Number(process.env.REFRESH_CLAIM)) // blocking/pause for REFRESH_CLAIM seconds
            await sendMessage(totalallacc.toLocaleString('en-US'))

            console.clear()
        }
    } catch (err) {
        // jika query.txt not exist
        if (err.code == 'ENOENT') {
            console.log('Fill the query.txt first!');
            fs.writeFileSync('query.txt', "query1\nquery2\netc...")
        } else {
            throw err
        }
    }
})();