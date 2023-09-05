import { Rule } from "sanity"

export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: Rule) => Rule.required().min(10).max(80)
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'projectImage',
        title: 'Project Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'author',
        title: 'Author',
        type: "array",
        of: [{ type: "reference", to: { type: "author" } }],
        validation: (Rule: Rule) => Rule.required().min(1).max(3),
      },
      {
        name: 'summary',
        title: 'Summary',
        type: 'string',
        description: 'Short summary of the post',
        placeholder: 'Short summary of the post',
        validation: (Rule: Rule) => Rule.required().min(10).max(300)
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{type: 'reference', to: {type: 'tag'}}],
        validation: (Rule: Rule) => Rule.required().min(1).max(5)
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
        validation: (Rule: Rule) => Rule.required()
      },
      {
        name: 'body',
        title: 'Body',
        type: 'blockContent',
        validation: (Rule: Rule) => Rule.required()
      }
    ],
  
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        summary: 'summary',
      },
      prepare(selection: { author: any }) {
        const {author} = selection
        return Object.assign({}, selection, {
          subtitle: author && `by ${author}`
        })
      }
    }
  }