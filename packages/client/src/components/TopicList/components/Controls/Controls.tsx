import { FC } from 'react'
import { Button, Select } from 'antd'

import styles from './Controls.module.css'

interface IProps {
  onCreateTopic: () => void
  onSortTopics: (value: TSortOption) => void
  onFilterTopics: (value: TFilterOption) => void
}

export type TSortOption = 'old' | 'new'

export type TFilterOption = 'own'

interface IOption {
  value: TSortOption | TFilterOption
  label: string
}

const selectOptions: IOption[] = [
  { value: 'new', label: 'Сначала новые' },
  { value: 'old', label: 'Сначала старые' },
]

const filterOptions: IOption[] = [{ value: 'own', label: 'Только мои' }]

export const Controls: FC<IProps> = ({
  onCreateTopic,
  onSortTopics,
  onFilterTopics,
}) => {
  return (
    <div className={styles.root}>
      <Select
        defaultValue="new"
        onChange={onSortTopics}
        options={selectOptions}
      />

      <Select
        className={styles.filter}
        mode="tags"
        placeholder="Фильтры"
        onChange={onFilterTopics}
        options={filterOptions}
      />

      <Button className={styles.link} onClick={onCreateTopic}>
        Добавить новую тему
      </Button>
    </div>
  )
}
