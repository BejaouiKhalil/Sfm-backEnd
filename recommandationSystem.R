#* @get /getRecommandetUserByName
normalDistribution <- function(name) {

  library(jsonlite)
  library(data.table)
  library(rlist)

  allEvent<-fromJSON("http://localhost:3000/events/getAllEvents")
  eventsId=allEvent['_id']
  a=nrow(eventsId)
  eventsId=eventsId[1:a , ]
  ids <- c(eventsId)
  k<- c (eventsId)
  df <- data.frame()
  for(n in ids) df[[n]]<-as.character()

  data<-fromJSON("http://localhost:3000/events/getRecommandetEvent")
  data1=data$eventsParticipated
  data$user$name

  x=list()
  i=0
  b=list(0)
  for(k in data1){
    for(listId in k['_id']){
      #for(e in names){
      for(j in listId){

        for(f in names){
          if(j == f ){
            x=list.append(x,1)
          }else{
            x=list.append(x,0)
          }
        }

        b=Map("+", x, b)
        x=list()
      }

      #}

    }

    i=i+1
    df[i, ]<-b
    b=list(0)

  }

  rownames(df) = data$user$name
df

  ##get userTorecommand participatedEvent
  caa<-list()
  for(xx in 1:length(df)){
    if(!is.na(rownames(df)[xx])){
      if(rownames(df)[xx]==name){
        for(ca in df[xx,])
          caa<-list.append(caa,ca)
      }
    }

  }
  caa<-as.numeric(caa)
  caa
  #get userRecommandent
  cab<-list()

  redendentNumber=0
  redendentNumberMax=0
  eventList<-list()
  for(xx in 1:length(df)){
    if(!is.na(rownames(df)[xx])){
    if(rownames(df)[xx]!=name){
      for(xa in df[xx,]){
        cab<-list.append(cab,xa)
        map<-Map("+",as.numeric(cab),caa)
        for(xb in map){
          if(xb>1){
            redendentNumber=redendentNumber+1
          }
        }
        if(redendentNumber>redendentNumberMax){
          c=map
          redendentNumberMax=redendentNumber
          userRec=rownames(df)[xx]
        }
      }
    }
    }
    redendentNumber=0
    cab<-list()
  }

  for(a in 1:length(c)){
    if(c[a]==1&& (df[c(name),a]==0)){
      eventList<-list.append(eventList,colnames(df)[a])

    }
  }
  eventList<-as.data.frame(eventList)
  eventList






}
