export const userRepositories = `{
    viewer { 
      repositories(last:5, privacy:PUBLIC){
        nodes{
          name
          description
          url
          languages(first: 5){
            nodes{
              name
              color
            }
          }
        }
      }
    }
}`
