const mix = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",'0','1','2','3','4','5','6','7','8','9']

const teamCode = () =>{
    let code = ''
    let i = 0
    for (i=0;i<6;i++){
        code+=(mix[Math.floor(Math.random()*62)])
    }
    return String(code)
}

module.exports = teamCode