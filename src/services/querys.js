export const userRepositories = `{
    viewer { 
      repositories(last:6, privacy:PUBLIC){
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
