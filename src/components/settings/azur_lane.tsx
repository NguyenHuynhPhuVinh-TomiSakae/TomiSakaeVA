/* eslint-disable prettier/prettier */
import { useTranslation } from 'react-i18next'
import settingsStore from '@/features/stores/settings'
import { TextButton } from '../textButton'
import { useCallback, useState, useRef, useEffect } from 'react'
import modelData from '@/azur_lane/Live2D'

const AzurLane = () => {
    const { t } = useTranslation()
    const { live2dType, selectedModel } = settingsStore()
    const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({})
    const selectedModelRef = useRef<HTMLDivElement>(null)
    const topRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollTopButton = document.createElement('button')
        scrollTopButton.innerHTML = '↑ ' + t('ScrollToTop')
        scrollTopButton.className = 'fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-colors duration-300 z-50'
        scrollTopButton.onclick = () => {
            topRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        document.body.appendChild(scrollTopButton)

        return () => {
            document.body.removeChild(scrollTopButton)
        }
    }, [selectedModel, t])

    const handleLive2DTypeChange = useCallback((newMode: boolean) => {
        if (newMode) {
            settingsStore.setState({
                live2dType: 'azur',
                selectedModel: selectedModel || (modelData.models[0]?.modelid || null)
            })
        } else {
            settingsStore.setState({
                live2dType: 'default'
            })
        }
    }, [selectedModel])

    const handleModelSelect = useCallback((modelId: string) => {
        settingsStore.setState({
            selectedModel: modelId
        })
    }, [])

    const handleImageLoad = (modelId: string) => {
        setLoadedImages(prev => ({
            ...prev,
            [modelId]: true
        }))
    }

    return (
        <div ref={topRef}>
            <div className="mb-16 typography-20 font-bold">
                {t('UseAzurLaneModel')}
            </div>
            <div className="mb-24">
                <TextButton
                    onClick={() => handleLive2DTypeChange(live2dType !== 'azur')}
                >
                    {live2dType === 'azur' ? t('StatusOn') : t('StatusOff')}
                </TextButton>
            </div>

            {live2dType === 'azur' && (
                <div>
                    <div className="mb-16 typography-16 font-bold flex items-center">
                        {t('SelectModel')}
                        {selectedModel && (
                            <button
                                onClick={() => selectedModelRef.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="ml-8 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-colors duration-300 text-sm"
                            >
                                ↓ {t('ScrollToSelected')}
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-24">
                        {modelData.models.filter(model => model.img).map((model) => (
                            <div
                                key={model.modelid}
                                className="flex flex-col items-center"
                                ref={selectedModel === model.modelid ? selectedModelRef : null}
                            >
                                <div
                                    onClick={() => handleModelSelect(model.modelid)}
                                    className={`
                                        relative cursor-pointer
                                        transition-all duration-500 ease-in-out
                                        ${selectedModel === model.modelid ?
                                            'transform scale-105 shadow-xl ring-4 ring-primary/30 rounded-lg' :
                                            'hover:scale-102 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className={`
                                        rounded-lg overflow-hidden
                                        border-2 transition-colors duration-300
                                        ${selectedModel === model.modelid ?
                                            'border-primary shadow-lg shadow-primary/40' :
                                            'border-surface2 hover:border-primary/30'
                                        }
                                    `}>
                                        <div className="aspect-w-1 aspect-h-1 w-[160px] bg-surface2/30">
                                            {!loadedImages[model.modelid] && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-surface2/50 backdrop-blur-sm">
                                                    <div className="relative w-12 h-12">
                                                        <div className="absolute inset-0 animate-ping opacity-75">
                                                            <svg viewBox="0 0 24 24" className="w-full h-full fill-primary/30">
                                                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                                                            </svg>
                                                        </div>
                                                        <div className="absolute inset-0 animate-spin duration-3000">
                                                            <svg viewBox="0 0 24 24" className="w-full h-full fill-primary">
                                                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <img
                                                src={model.img}
                                                alt={model.name}
                                                className={`
                                                    w-full h-full object-cover
                                                    transition-all duration-700 ease-out
                                                    ${loadedImages[model.modelid]
                                                        ? 'opacity-100 scale-100 blur-0'
                                                        : 'opacity-0 scale-95 blur-sm'}
                                                `}
                                                loading="lazy"
                                                onLoad={() => handleImageLoad(model.modelid)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-8 text-center">
                                    <span className={`
                                        text-sm font-medium leading-relaxed
                                        transition-colors duration-300
                                        ${selectedModel === model.modelid ?
                                            'text-primary' :
                                            'text-text0 hover:text-primary/80'
                                        }
                                    `}>
                                        {model.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-colors duration-300"
                        >
                            ↑ {t('ScrollToTop')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AzurLane