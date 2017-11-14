var battletag = '';
var region = '';
var stat = '';  

$('#search').click(function () {
    battletag = $('[name=battletag]').val();
    region = $('[name=region]').val();
    stat = $('[name=stats]').val();

    makeRequest(battletag, region, stat);
})

function makeRequest(battletag, region, stat) {
    var url = 'https://owapi.net/api/v3';
    console.log(stat);
    $.get(url + '/u/' + battletag + '/stats', function(data) {
        var response = data;
        var overallStats = response[region].stats.competitive.overall_stats;
        $('#profile-image').attr('src', overallStats.avatar);
        $('#stats-list').empty();
         
        if (stat === 'competitive') {
            $('#stats-list').append('<li><strong>Win Rate: </strong> ' + overallStats.win_rate + ' </li>');
            $('#stats-list').append('<li><strong>Wins on season: </strong> ' + overallStats.wins + ' </li>');
            $('#stats-list').append('<li><strong>Losses on season: </strong> ' + overallStats.losses + ' </li>');
            $('#stats-list').append('<li><strong>Games: </strong> ' + overallStats.games + ' </li>');
            $('#stats-list').append('<li><strong>Rank: </strong> ' + overallStats.comprank + ' </li>');         
        } 
            else if (stat === 'overall_stats') {
            var overall = response[region].stats.competitive.game_stats;
            $.each(overall, function (key, value) {
                $('#stats-list').append('<li><strong>' + key + ': </strong> ' + value + ' </li>');
            });
        } else if (stat === 'win_rate') {
            $('#stats-list').append('<li><strong>Win Rate: </strong> ' + overallStats.win_rate + ' </li>');
        } else if (stat === 'level') {
            $('#stats-list').append('<li><strong>Level: </strong> ' + overallStats.level + ' </li>');
        } else if (stat === 'losses') {
            $('#stats-list').append('<li><strong>Losses: </strong> ' + overallStats.losses + ' </li>');
        }
    }, 'json');
}
