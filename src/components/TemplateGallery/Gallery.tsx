import React from 'react'
import { allRestApiTemplates } from '../../types/restApiTemplates'
import { useStaticQuery, graphql } from 'gatsby'
import { Snippet } from './Snippet'
import { Boilerplate } from './Boilerplate'
import { SearchBox } from './SearchBox'

export const Gallery: React.FunctionComponent<GalleryProps> = ({

}) => {
  // TODO get hooks working instead of useStaticQuery in components
  const templates: allRestApiTemplates['data'] = useStaticQuery(
    graphql`
    query {
      allRestApiTemplates {
        edges {
          node {
            tags
            share_url
            repository_url
            endpointId
            description
            demos {
              bar {
                text
                url
              }
              foo {
                text
                url
              }
              main {
                share_url
                tags
                text
                url
              }
            }
            code
            title
            type
            url
            weight
          }
        }
      }
    }

    `,
  )
  const snippets = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "snippet")
  const boilerplates = templates.allRestApiTemplates.edges.map(edge => edge.node).filter(template => template.type === "boilerplate")
  return (
    <>
      <h1>Template Gallery</h1>
      <p>These templates are simple building blocks for developing Workers scripts.</p>
      <SearchBox snippets={snippets} boilerplates={boil} />
      <div className="gallery" id="results">
        <h2>Boilerplates</h2>
        {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
        <section className="template-wrapper boilerplate">
          {boilerplates.length ? boilerplates.map(template => (
            <Boilerplate {...template} key={template.endpointId}></Boilerplate>
          )) : null}
        </section>
        <h2>Snippets</h2>
        {/* TODO add in style <h2 style="padding-bottom: 20px">Snippets</h2> */}
        <section className="template-wrapper snippet">
          {snippets.length ? snippets.map(template => (
            <Snippet {...template} key={template.endpointId}></Snippet>
          )) : null}
        </section>
        {/* TODO add in the raw JS that adds templates to global */}
      </div>
    </>
  )
}

export type GalleryProps = {

}
