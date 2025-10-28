import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
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
  description?: string;
}

interface CartItem {
  service: Service;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

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
      category: 'Подписчики',
      description: 'Живые подписчики для вашего Telegram канала. Гарантия качества и безопасности аккаунта.'
    },
    {
      id: 3,
      platform: 'vk',
      title: 'Рассылка по личным сообщениям групп ВКонтакте 100 сообщений',
      priceFrom: 1000,
      priceUnit: '₽',
      details: '1 000₽ за 100 сообщ.',
      icon: 'MessageSquare',
      category: 'Разное',
      description: 'Массовая рассылка сообщений по личным чатам участников групп ВКонтакте.'
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

  const addToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.service.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.service.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину!",
      description: service.title,
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCart(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.service.id === serviceId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.service.priceFrom * item.quantity), 0);
  };

  const openServiceDetails = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-40">
        <img 
          src="https://cdn.poehali.dev/projects/fb9d21c8-11db-4b4b-a3e5-7668fa83d911/files/25e408d9-04fc-4620-bc23-a85cee85a733.jpg" 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>
      <div className="relative z-10">
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1 tracking-tight">INFORMATOR MEDIA</h1>
              <p className="text-sm text-muted-foreground font-light">SMM-специалист</p>
            </div>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative border-border/50 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all duration-300">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card border-l border-border w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-primary">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-16">
                        <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => (
                            <Card key={item.service.id} className="bg-muted/20 border-border">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-foreground mb-1">{item.service.title}</h4>
                                    <p className="text-xs text-muted-foreground">{item.service.details}</p>
                                  </div>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    onClick={() => removeFromCart(item.service.id)}
                                    className="ml-2 h-8 w-8"
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                                      className="h-8 w-8 border-primary/50"
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                    <Button 
                                      size="icon" 
                                      variant="outline" 
                                      onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                                      className="h-8 w-8 border-primary/50"
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                  <span className="text-lg font-bold text-primary">
                                    {(item.service.priceFrom * item.quantity).toLocaleString()} ₽
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        <div className="border-t border-border pt-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">
                              {getTotalPrice().toLocaleString()} ₽
                            </span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Оформить заказ
                            <Icon name="ArrowRight" size={20} className="ml-2" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              <Button 
                variant="outline" 
                onClick={toggleTheme}
                className="border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
              </Button>
            </div>
          </div>

          <div className="relative mb-6">
            <Input 
              type="search"
              placeholder="Найти услугу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 h-12 bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 rounded-lg transition-all duration-300"
            />
            <Button 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] text-primary-foreground rounded-lg transition-all duration-300"
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
                className={`rounded-full border-border/50 transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,107,53,0.5)]' 
                    : 'bg-transparent text-foreground hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,107,53,0.2)]'
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
              className="bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] hover:scale-[1.02] transition-all duration-500 overflow-hidden group rounded-lg"
            >
              <div className="bg-gradient-to-br from-card to-card/50 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-3xl"></div>
                <Icon name={getPlatformIcon(service.platform)} size={56} className="text-primary/80 relative z-10" />
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
                <div className="flex gap-2">
                  <Button 
                    onClick={() => openServiceDetails(service)}
                    variant="outline"
                    className="flex-1 border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <Icon name="Info" size={16} className="mr-2" />
                    Подробнее
                  </Button>
                  <Button 
                    onClick={() => addToCart(service)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </div>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-2 border-primary/50 text-foreground">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary flex items-center gap-3">
                  <Icon name={getPlatformIcon(selectedService.platform)} size={32} className="text-primary" />
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  {selectedService.description || 'Качественная SMM услуга для вашего бизнеса'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="bg-muted/20 rounded-lg p-4 border border-border">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Цена от</span>
                    <span className="text-4xl font-bold text-primary">
                      {selectedService.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-2xl text-primary">{selectedService.priceUnit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedService.details}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Быстрый старт</p>
                      <p className="text-xs text-muted-foreground">Начало работы в течение 24 часов</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Гарантия качества</p>
                      <p className="text-xs text-muted-foreground">Все услуги выполняются профессионалами</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">Поддержка 24/7</p>
                      <p className="text-xs text-muted-foreground">Всегда на связи для решения вопросов</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 border-primary/50"
                  >
                    Закрыть
                  </Button>
                  <Button 
                    onClick={() => {
                      addToCart(selectedService);
                      setIsDialogOpen(false);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-card/50 border-t border-border mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Связаться с нами</h3>
              <p className="text-sm text-muted-foreground">Готовы обсудить ваш проект? Напишите нам!</p>
            </div>
            <a 
              href="https://t.me/Stoimostreklama"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50"
            >
              <Icon name="Send" size={24} />
              <span className="font-semibold text-lg">Написать в Telegram</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © 2024 INFORMATOR MEDIA. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;