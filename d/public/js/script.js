$(document).ready(()=>{
    let $showList=$('#showList')
    let $show=$('#show')
    $.ajax({
        type:'Get',
        url:'http://api.tvmaze.com/shows',
        success:(shows)=>{
            $show.hide()
            $('#home').hide
            $.each(shows,(i,show)=>{
                $showList.append(`<li><a class="link" id=${i+1} href='${show._links.self.href}'>${show.name}</a></li>`)
            })
            $('.link').on('click',(event)=>{
                event.preventDefault()
                let linkUrl=$(event.target).attr('href')
                $showList.hide()
                $show.empty()
                ClickLink(linkUrl)
                $('#home').show()
            })
            $('#show').show()
        },
        error:()=>{
            alert('error loading shows')
        }
    })

    $('#searchForm').submit((event)=>{
        event.preventDefault()
        $('#show').empty()
        $('#show').hide()
        let input=$('#searchTerm') .val().trim()
        if(input.length===0)
        {
            event.preventDefault()
            alert('You must provide a search term!')
        }else{
            $.ajax({
                type:'Get',
                url:'http://api.tvmaze.com/search/shows?q='+input ,
                success:(shows)=>{
                    $('#home').hide()
                    $('#showList').empty()
                    $('#showList').hide()
                    $.each(shows,(i,show)=>{
                        $showList.append
(`<li><a class='link' href='${show.show._links.self.href}'>${show.show.name}</a></li>`)
                    })
                    $('#showList').show()

                    $('#home').show()
                    $('.link').on('click',(event)=>{
                        event.preventDefault()
                        let linkUrl=$(event.target).attr('href')
                        $showList.hide()
                        $show.empty()
                        ClickLink(linkUrl)
                    })
                    $('#show').show()
        
                    error:()=>{
                        alert('error ')
                    }
                }
            })
        }


    })

    ClickLink=(linkUrl)=>{
        $.ajax({
            type:'Get',
            url:linkUrl,
            success:(show)=>{
                
                if(show.name)
                {
                    $show.append('<h1>',show.name)
                    $show.append('<br/>')
                }
                if(show.image && show.image.medium)
                {
                    let imgLink=show.image.medium
                $show.append($('<img>',{id:'theImg',src:imgLink}))
                }
                else
                {
$show.append($('<img>',{id:'theImg',src:'/public/image/no_image.jpeg'}))
                }

const language=show.language?show.language:'N/A'
const network=show.network && show.network.name?show.network.name:'N/A'
const summary=show.summary?show.summary:'N/A'
const rating=show.rating && show.rating.average?show.rating.average:'N/A'

                let genres=[]
                if(show.genres.length!==0){
                    for(let i=0;i<show.genres.length;i++)
                    {
                        genres.push(show.genres[i])
                    }
                }
                $show.append($('<dl/>').attr('id','detail'))

                let $genresList=$('<ul></ul>')

                for(let i=0;i<genres.length;i++)
                {
                    let $genre=$(`<li>${genres [i]} </li>`)
                    $genresList.append($genre)
                }

                let $detail=$('#detail')
                $detail.append(`<dt> Language </dt>`)
                $detail.append(`<dd> ${language} </dd>`)
                $detail.append(`<dt> Genres </dt>`)

                $detail.append($genresList)

                $detail.append(`<dt> Average Rating </dt>`)
                $detail.append(`<dd> ${rating}</dd>`)
                $detail.append(`<dt> Network </dt>`)
                $detail.append(`<dd> ${network}</dd>`)
                $detail.append(`<dt> Summary </dt>`)
                $detail.append(`<dd> ${summary} </dd>`)
            },
            error:()=>{
                alert('erro')
            }
            
        })
    }
})