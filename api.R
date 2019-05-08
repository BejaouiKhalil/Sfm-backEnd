library(plumber)
api <- plumb("C:/Users/oussema/Documents/GitHub/Sfm-Learning/sfm-tower/sfmback/recommandationSystem.R")
api$run(port=5000)

