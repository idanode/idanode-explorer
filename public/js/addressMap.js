//websocket
var socket = io.connect(location.href);

function start(){
        socket.emit('topHolderRank');
}
socket.on('connect', function () {
        start();
});

socket.on('topHolderRank',function(data){
        if(data.length > 100){
                data = data.slice(0,100);
        }
        var html = ''
        data.forEach(function(row,index){
                //console.log(row.rank + " | " + row.address + " | " + row.amount);
                html += '<tr style="border-bottom: 1px solid #E7EBF3">' +
                                        '<td>#'+(parseInt(row.rank)+1)+'</td>' +
                                        '<td><a href=http://18.188.119.162:8080/detail#'+row.address+'>'+row.address+'</a></td>' +
                                        '<td>'+NumberFormat(parseInt(row.amount))+'</td>' +
                                        '</tr>'

        });
        $('#tbodyHint').html(html);
});

function NumberFormat(number){
        var reg = /\d{1,3}(?=(\d{3})+$)/g;
        return (number + '').replace(reg, '$&,');
}
