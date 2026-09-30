import {useCallback} from 'react'
import {Card, Flex, Text} from '@sanity/ui'
import {Autocomplete} from '@sanity/ui/autocomplete'
import {SearchIcon} from '@sanity/icons/Search'
import {set, unset, type StringInputProps} from 'sanity'
import {languages} from '../lib/languages'

type LanguageOption = (typeof languages)[number]

const byCode = new Map(languages.map((language) => [language.value, language]))

const filterOption = (query: string, option: LanguageOption) => {
  const q = query.trim().toLowerCase()
  return !q || option.value === q || option.title.toLowerCase().includes(q)
}

const renderOption = (option: LanguageOption) => (
  <Card as="button" padding={3}>
    <Flex justify="space-between" gap={3}>
      <Text size={1}>{option.title}</Text>
      <Text size={1} muted>
        {option.value}
      </Text>
    </Flex>
  </Card>
)

const renderValue = (value: string, option?: LanguageOption) =>
  option ? `${option.title} (${option.value})` : (byCode.get(value)?.title ?? value)

/** Searchable picker for the ISO 639-1 language code. */
export function LanguageInput(props: StringInputProps) {
  const {value, onChange, elementProps, readOnly} = props
  const handleChange = useCallback(
    (next: string) => onChange(next ? set(next) : unset()),
    [onChange],
  )

  return (
    <Autocomplete
      id={elementProps.id}
      ref={elementProps.ref}
      onFocus={elementProps.onFocus}
      onBlur={elementProps.onBlur}
      readOnly={readOnly}
      openButton
      icon={SearchIcon}
      placeholder="Search by name or code"
      options={languages}
      value={value ?? ''}
      onChange={handleChange}
      filterOption={filterOption}
      renderOption={renderOption}
      renderValue={renderValue}
    />
  )
}
