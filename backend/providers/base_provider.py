from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseProvider(ABC):
    def __init__(self, api_key: str, key_name: str):
        self.api_key = api_key
        self.key_name = key_name

    @abstractmethod
    def get_analytics(self) -> Dict[str, Any]:
        pass