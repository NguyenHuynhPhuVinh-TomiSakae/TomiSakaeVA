/* eslint-disable prettier/prettier */
import { useTranslation } from 'react-i18next'
import settingsStore from '@/features/stores/settings'
import { TextButton } from '../textButton'
import { useCallback } from 'react'

const AzurLane = () => {
    const { t } = useTranslation()
    const { live2dType } = settingsStore()

    const handleLive2DTypeChange = useCallback((newMode: boolean) => {
        settingsStore.setState({
            live2dType: newMode ? 'azur' : 'default'
        })
    }, [])

    return (
        <div className="mb-40">
            <div className="mb-16 typography-20 font-bold">
                {t('UseAzurLaneModel')}
            </div>
            <div className="my-8">
                <TextButton
                    onClick={() => {
                        handleLive2DTypeChange(live2dType !== 'azur')
                    }}
                >
                    {live2dType === 'azur' ? t('StatusOn') : t('StatusOff')}
                </TextButton>
            </div>
        </div>
    )
}

export default AzurLane
