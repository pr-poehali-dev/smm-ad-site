import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: number;
  platform: string;
  title: string;
  priceFrom: number;
  priceUnit: string;
  details: string;
  icon: string;
  category: string;
}

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');

  const services: Service[] = [
    {
      id: 1,
      platform: 'telegram',
      title: '100 Подписчиков в чат-канал МАХ',
      priceFrom: 1500,
      priceUnit: '₽',
      details: '1500₽ за 100 подп.',
      icon: 'Users',
      category: 'Подписчики'
    },
    {
      id: 2,
      platform: 'telegram',
      title: 'Подписчики в Telegram - БЕЗ БОТОВ 100 человек',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 подп.',
      icon: 'MessageCircle',
      category: 'Подписчики'
    },
    {
      id: 3,
      platform: 'vk',
      title: 'Рассылка по личным сообщениям групп ВКонтакте 100 сообщений',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 сообщ.',
      icon: 'MessageSquare',
      category: 'Разное'
    },
    {
      id: 4,
      platform: 'vk',
      title: 'Живые подписчики в Vk - БЕЗ БОТОВ 100 человек',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '10 000₽ за 1 000 подп.',
      icon: 'Users',
      category: 'Подписчики'
    },
    {
      id: 5,
      platform: 'vk',
      title: '10,000 просмотров ваших видео в Вконтакте',
      priceFrom: 500,
      priceUnit: '₽',
      details: '5 000₽ за 100 000 просм.',
      icon: 'Eye',
      category: 'Просмотры'
    },
    {
      id: 6,
      platform: 'telegram',
      title: 'Живые англоязычные пользователи телеграмм',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 подп.',
      icon: 'Globe',
      category: 'Подписчики'
    },
    {
      id: 7,
      platform: 'other',
      title: '100 живых подписчиков Trovo',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 подп.',
      icon: 'Users',
      category: 'Подписчики'
    },
    {
      id: 8,
      platform: 'other',
      title: '100 подписчиков для социальной сети Yappy',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 подп.',
      icon: 'UserPlus',
      category: 'Подписчики'
    },
    {
      id: 9,
      platform: 'youtube',
      title: '500 нажатий на кнопку В ТОП Rutube',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '2 000₽ за 1 000 наж.',
      icon: 'Heart',
      category: 'Разное'
    },
    {
      id: 10,
      platform: 'telegram',
      title: '100 000 Просмотров на пост в Telegram',
      priceFrom: 500,
      priceUnit: '₽',
      details: '5₽ за 1 000 просм.',
      icon: 'Eye',
      category: 'Просмотры'
    },
    {
      id: 11,
      platform: 'telegram',
      title: 'Подбор Телеграм-каналов для закупа рекламы',
      priceFrom: 25000,
      priceUnit: '₽',
      details: 'фиксированная цена',
      icon: 'Target',
      category: 'Разное'
    },
    {
      id: 12,
      platform: 'telegram',
      title: '2000 ботов в телеграмм бота',
      priceFrom: 500,
      priceUnit: '₽',
      details: '25₽ за 100 подп.',
      icon: 'Bot',
      category: 'Подписчики'
    }
  ];

  const filters = ['Все', 'Telegram', 'VK', 'YouTube', 'Подписчики', 'Просмотры', 'Разное'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'Все' || 
      service.platform === activeFilter.toLowerCase() ||
      service.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOrder = (service: Service) => {
    toast({
      title: "Заказ оформлен!",
      description: `Услуга: ${service.title}`,
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'telegram': return 'MessageCircle';
      case 'vk': return 'Mail';
      case 'youtube': return 'Youtube';
      default: return 'Users';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1">INFORMATOR MEDIA</h1>
              <p className="text-sm text-muted-foreground">SMM-специалист</p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="outline" className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-primary/50 hover:bg-primary hover:text-primary-foreground">
                <Icon name="Send" size={20} />
              </Button>
              <select className="bg-card border border-primary/50 text-foreground rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Темная биржа</option>
              </select>
            </div>
          </div>

          <div className="relative mb-6">
            <Input 
              type="search"
              placeholder="Найти услугу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 h-12 bg-card border-primary/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
            <Button 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Icon name="Search" size={20} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border-primary/50 ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-transparent text-primary hover:bg-primary/10'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="bg-primary/90 p-6 flex items-center justify-center">
                <Icon name={getPlatformIcon(service.platform)} size={48} className="text-primary-foreground" />
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground leading-tight min-h-[3rem]">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">от</span>
                    <span className="text-3xl font-bold text-primary">
                      {service.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-xl text-primary">{service.priceUnit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{service.details}</p>
                </div>
                <Button 
                  onClick={() => handleOrder(service)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Заказать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Услуги не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </main>

      <footer className="bg-card/50 border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 INFORMATOR MEDIA. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
